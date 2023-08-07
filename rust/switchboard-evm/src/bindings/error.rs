use std::{error::Error, sync::Arc};

#[derive(Clone, Debug, PartialEq)]
pub enum Err {
    Generic,
    SgxError,
    SgxWriteError,
    AnchorParse,
    TxFailure,
    NetworkErr,
    InvalidQuoteError,
    TxCompileErr,
    EnvVariableMissing,
    EvmError,
    InvalidKeypairFile,
    IpfsParseError,
    IpfsNetworkError,
    HeartbeatRoutineFailure,
    EventListenerRoutineFailure,
    TxDeserializationError,
    KeyParseError,
    QuoteParseError,
    InvalidInstructionError,
    AnchorParseError,
    IllegalFunctionOutput,
    FunctionResultParseError,
    QvnTxSendFailure,
    FunctionVerifyFailure,
    FunctionResultIllegalAccount,
    FunctionResultAccountsMismatch,
    FunctionResultInvalidData,
    FunctionResultInvalidPid,
    FunctionResultEmptyInstructions,
    AnchorLoadError,
}
impl std::error::Error for Err {}
impl std::fmt::Display for Err {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:#?}", self)
    }
}

#[derive(Clone, Debug)]
pub enum SwitchboardClientError {
    EnvVariableMissing(String),
    InvalidEnv(String),
    RpcURLParseError(String),
    CustomError {
        message: String,
        source: Arc<dyn Error + 'static>,
    },
}
impl std::error::Error for SwitchboardClientError {}
// impl From<std::env::VarError> for SwitchboardClientError {
// fn from(value: std::env::VarError) -> Self {
// Self::InvalidEnv(value.to_string())
// }
// }
impl From<ethers::abi::ParseError> for SwitchboardClientError {
    fn from(value: ethers::abi::ParseError) -> Self {
        Self::RpcURLParseError(value.to_string())
    }
}
impl std::fmt::Display for SwitchboardClientError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:#?}", self)
    }
}
