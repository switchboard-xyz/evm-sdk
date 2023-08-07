use super::switchboard;
use ethers::core::{
    abi::ParamType,
    types::{
        transaction::eip712::{make_type_hash, EIP712Domain},
        Address, Bytes, U256,
    },
};
use inflector::Inflector;
use switchboard_common::EvmTransaction;
use syn::{
    parse::Error, spanned::Spanned, Data, Expr, Fields, GenericArgument, Lit, PathArguments,
    Result as SynResult, Type,
};

///`Transaction(uint256,uint256,uint256,address,address,bytes)`
#[derive(
    Clone,
    ::ethers::contract::EthAbiType,
    ::ethers::contract::EthAbiCodec,
    Default,
    Debug,
    PartialEq,
    Eq,
    Hash,
)]
pub struct Transaction {
    pub expiration_time_seconds: ::ethers::core::types::U256,
    pub gas_limit: ::ethers::core::types::U256,
    pub value: ::ethers::core::types::U256,
    pub to: ::ethers::core::types::Address,
    pub from: ::ethers::core::types::Address,
    pub data: ::ethers::core::types::Bytes,
}

type Eip712Error = ethers::core::types::transaction::eip712::Eip712Error;

impl Transaction {
    fn type_hash(&self) -> ::core::result::Result<[u8; 32], Eip712Error> {
        let input: ::syn::DeriveInput = ::syn::parse_quote! { struct Transaction {
            pub expiration_time_seconds: ::ethers::core::types::U256,
            pub gas_limit: ::ethers::core::types::U256,
            pub value: ::ethers::core::types::U256,
            pub to: ::ethers::core::types::Address,
            pub from: ::ethers::core::types::Address,
            pub data: ::ethers::core::types::Bytes,
        } };
        let primary_type = input.clone().ident;
        let parsed_fields = parse_fields(&input).unwrap();
        let type_hash = make_type_hash(primary_type.to_string(), &parsed_fields);
        Ok(type_hash)
    }

    #[inline]
    fn domain_separator(
        &self,
        domain: ethers::core::types::transaction::eip712::EIP712Domain,
    ) -> ::core::result::Result<[u8; 32], Eip712Error> {
        let domain_separator = domain.separator();

        // @NOTE Anoushk - check this
        let _domain_str = serde_json::to_string(&domain).unwrap();
        Ok(domain_separator)
    }

    fn struct_hash(&self) -> ::core::result::Result<[u8; 32], Eip712Error> {
        let mut items = vec![ethers::core::abi::Token::Uint(
            ethers::core::types::U256::from(&Self::type_hash(&self)?[..]),
        )];

        if let ethers::core::abi::Token::Tuple(tokens) =
            ethers::core::abi::Tokenizable::into_token(::core::clone::Clone::clone(self))
        {
            items.reserve(tokens.len());
            for token in tokens {
                match &token {
                    ethers::core::abi::Token::Tuple(_t) => {
                        // TODO: check for nested Eip712 Type;
                        // Challenge is determining the type hash
                        return Err(Eip712Error::NestedEip712StructNotImplemented);
                    }
                    _ => {
                        items.push(
                            ethers::core::types::transaction::eip712::encode_eip712_type(token),
                        );
                    }
                }
            }
        }

        let struct_hash = ethers::core::utils::keccak256(ethers::core::abi::encode(&items));

        Ok(struct_hash)
    }

    pub fn encode_eip712(
        &self,
        domain: ethers::core::types::transaction::eip712::EIP712Domain,
    ) -> std::result::Result<[u8; 32], Eip712Error> {
        // encode the digest to be compatible with solidity abi.encodePacked()
        // See: https://github.com/gakonst/ethers-rs/blob/master/examples/permit_hash.rs#L72

        let domain_separator = self.domain_separator(domain)?;
        let struct_hash = self.struct_hash()?;

        let digest_input = [&[0x19, 0x01], &domain_separator[..], &struct_hash[..]].concat();

        Ok(ethers::core::utils::keccak256(digest_input))
    }
}

pub fn parse_fields(
    input: &syn::DeriveInput,
) -> SynResult<Vec<(String, ethers::core::abi::ParamType)>> {
    let data = match &input.data {
        Data::Struct(s) => s,
        Data::Enum(e) => {
            return Err(Error::new(
                e.enum_token.span,
                "Eip712 is not derivable for enums",
            ))
        }
        Data::Union(u) => {
            return Err(Error::new(
                u.union_token.span,
                "Eip712 is not derivable for unions",
            ))
        }
    };

    let named_fields = match &data.fields {
        Fields::Named(fields) => fields,
        _ => return Err(Error::new(input.span(), "unnamed fields are not supported")),
    };

    let mut fields = Vec::with_capacity(named_fields.named.len());
    for f in named_fields.named.iter() {
        // strip the raw identifier prefix
        let name = f.ident.as_ref().unwrap().to_string();
        let s = name.strip_prefix("r#").unwrap_or(&name);
        let name = s.to_camel_case();

        let ty = match f
            .attrs
            .iter()
            .find(|a| a.path().segments.iter().any(|s| s.ident == "eip712"))
        {
            // Found nested Eip712 Struct
            // TODO: Implement custom
            Some(a) => {
                return Err(Error::new(
                    a.span(),
                    "nested Eip712 struct are not yet supported",
                ))
            }
            // Not a nested eip712 struct, return the field param type;
            None => find_parameter_type(&f.ty)?,
        };

        fields.push((name, ty));
    }

    Ok(fields)
}
pub fn find_parameter_type(ty: &Type) -> core::result::Result<ParamType, Error> {
    const ERROR: &str = "Failed to derive proper ABI from array field";

    match ty {
        Type::Array(arr) => {
            let ty = find_parameter_type(&arr.elem)?;
            if let Expr::Lit(ref expr) = arr.len {
                if let Lit::Int(ref len) = expr.lit {
                    if let Ok(len) = len.base10_parse::<usize>() {
                        return match (ty, len) {
                            (ParamType::Uint(8), 32) => Ok(ParamType::FixedBytes(32)),
                            (ty, len) => Ok(ParamType::FixedArray(Box::new(ty), len)),
                        };
                    }
                }
            }
            Err(Error::new(arr.span(), ERROR))
        }

        Type::Path(ty) => {
            // check for `Vec`
            if let Some(segment) = ty.path.segments.iter().find(|s| s.ident == "Vec") {
                if let PathArguments::AngleBracketed(ref args) = segment.arguments {
                    // Vec<T, A?>
                    debug_assert!(matches!(args.args.len(), 1 | 2));
                    let ty = args.args.iter().next().unwrap();
                    if let GenericArgument::Type(ref ty) = ty {
                        return find_parameter_type(ty)
                            .map(|kind| ParamType::Array(Box::new(kind)));
                    }
                }
            }

            // match on the last segment of the path
            ty.path
                .get_ident()
                .or_else(|| ty.path.segments.last().map(|s| &s.ident))
                .and_then(|ident| {
                    match ident.to_string().as_str() {
                        // eth types
                        "Address" => Some(ParamType::Address),
                        "Bytes" => Some(ParamType::Bytes),
                        "Uint8" => Some(ParamType::Uint(8)),

                        // core types
                        "String" => Some(ParamType::String),
                        "bool" => Some(ParamType::Bool),
                        // usize / isize, shouldn't happen but use max width
                        "usize" => Some(ParamType::Uint(64)),
                        "isize" => Some(ParamType::Int(64)),

                        s => parse_param_type(s),
                    }
                })
                .ok_or_else(|| Error::new(ty.span(), ERROR))
        }

        Type::Tuple(ty) => ty
            .elems
            .iter()
            .map(find_parameter_type)
            .collect::<core::result::Result<Vec<_>, _>>()
            .map(ParamType::Tuple),

        _ => Err(Error::new(ty.span(), ERROR)),
    }
}
pub fn parse_param_type(s: &str) -> Option<ParamType> {
    match s.chars().next() {
        Some('H' | 'h') => {
            let size = s[1..].parse::<usize>().ok()? / 8;
            Some(ParamType::FixedBytes(size))
        }

        Some(c @ 'U' | c @ 'I' | c @ 'u' | c @ 'i') => {
            let size = s[1..].parse::<usize>().ok()?;
            if matches!(c, 'U' | 'u') {
                Some(ParamType::Uint(size))
            } else {
                Some(ParamType::Int(size))
            }
        }
        _ => None,
    }
}

impl From<&EvmTransaction> for Transaction {
    fn from(tx: &EvmTransaction) -> Self {
        Transaction {
            expiration_time_seconds: U256::from(tx.expiration_time_seconds),
            gas_limit: U256::from_str_radix(&tx.gas_limit, 10).unwrap(),
            value: U256::from_str_radix(&tx.value, 10).unwrap(),
            to: Address::from_slice(tx.to.as_slice()),
            from: Address::from_slice(tx.from.as_slice()),
            data: Bytes::from(tx.data.clone()),
        }
    }
}

impl From<&switchboard::Transaction> for Transaction {
    fn from(tx: &switchboard::Transaction) -> Self {
        Transaction {
            expiration_time_seconds: tx.expiration_time_seconds,
            gas_limit: tx.gas_limit,
            value: tx.value,
            to: tx.to,
            from: tx.from,
            data: tx.data.clone(),
        }
    }
}

pub fn get_transaction_hash(
    name: String,
    version: String,
    chain_id: u64,
    verifying_contract: Address,
    transaction: switchboard::Transaction,
) -> std::result::Result<[u8; 32], Eip712Error> {
    let tx = Transaction::from(&transaction);
    let domain = EIP712Domain {
        name: Some(name.into()),
        version: Some(version.into()),
        chain_id: Some(chain_id.into()),
        verifying_contract: Some(verifying_contract),
        salt: None,
    };

    // encode hash
    tx.encode_eip712(domain.clone())
}
