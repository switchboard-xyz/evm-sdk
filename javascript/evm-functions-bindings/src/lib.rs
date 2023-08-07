use neon::prelude::*;
use switchboard_common::{
    ChainResultInfo, EVMFunctionResult as SBEVMFunctionResult, EvmTransaction as SBEvmTransaction,
    FunctionResult, Gramine,
};

use serde::*;
#[derive(Default, Clone, PartialEq, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EVMFunctionResult {
    // NOTE: tx.len() == signatures.len() must be true
    pub txs: Vec<EvmTransaction>,
    pub signatures: Vec<Vec<u8>>,
}
#[derive(Clone, PartialEq, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EvmTransaction {
    pub expiration_time_seconds: String,
    pub gas_limit: String,
    pub value: String,
    pub to: Vec<u8>,
    pub from: Vec<u8>,
    pub data: Vec<u8>,
}
fn call_emit(mut cx: FunctionContext) -> JsResult<JsObject> {
    let version = cx.argument::<JsNumber>(0)?.value(&mut cx) as u32;

    let enclave_wallet = cx.argument::<JsString>(1)?.value(&mut cx);

    let fn_key = cx
        .argument::<JsArray>(2)?
        .to_vec(&mut cx)?
        .iter_mut()
        .map(|item| {
            item.downcast::<JsNumber, _>(&mut cx)
                .unwrap()
                .value(&mut cx) as u8
        })
        .collect::<Vec<u8>>();

    let signer = cx
        .argument::<JsArray>(3)?
        .to_vec(&mut cx)?
        .iter_mut()
        .map(|item| {
            item.downcast::<JsNumber, _>(&mut cx)
                .unwrap()
                .value(&mut cx) as u8
        })
        .collect::<Vec<u8>>();
    let chain_result_info = cx.argument::<JsString>(4)?.value(&mut cx);
    let decoded_chain_result_info: EVMFunctionResult =
        serde_json::from_str(&chain_result_info).unwrap();

    let txns = decoded_chain_result_info
        .txs
        .iter()
        .map(|txn| SBEvmTransaction {
            expiration_time_seconds: txn.expiration_time_seconds.parse().unwrap(),
            value: txn.value.clone(),
            data: txn.data.clone(),
            gas_limit: txn.gas_limit.clone(),
            to: txn.to.clone(),
            from: txn.from.clone(),
        })
        .collect::<Vec<SBEvmTransaction>>();
    let quote = Gramine::generate_quote(enclave_wallet.as_bytes()).unwrap_or_default();
    let cr = ChainResultInfo::Evm(SBEVMFunctionResult {
        txs: txns,
        signatures: decoded_chain_result_info.signatures,
    });
    emit(version, quote, fn_key, signer, cr);
    Ok(cx.empty_object())
}

pub fn emit(
    version: u32,
    quote: Vec<u8>,
    fn_key: Vec<u8>,
    signer: Vec<u8>,
    chain_result_info: ChainResultInfo,
) {
    let fr = FunctionResult {
        version,
        quote,
        fn_key,
        signer,
        fn_request_key: Vec::new(),
        fn_request_hash: Vec::new(),
        chain_result_info,
    };
    fr.emit();
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("emit", call_emit)?;
    Ok(())
}
