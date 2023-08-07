pub use switchboard::*;
/// This module was auto-generated with ethers-rs Abigen.
/// More information at: <https://github.com/gakonst/ethers-rs>
#[allow(
    clippy::enum_variant_names,
    clippy::too_many_arguments,
    clippy::upper_case_acronyms,
    clippy::type_complexity,
    dead_code,
    non_camel_case_types
)]
pub mod switchboard {
    #[rustfmt::skip]
    const __ABI: &str = "[{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"NewRandomValue\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"callback\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"randomValue\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_initializationContractAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"_calldata\",\"type\":\"bytes\",\"components\":[]}],\"type\":\"error\",\"name\":\"InitializationFunctionReverted\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ACLAdminAlreadyInitialized\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"ACLNotAdmin\",\"outputs\":[]},{\"inputs\":[],\"type\":\"error\",\"name\":\"InvalidEntry\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"initialize\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"isAdmin\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"isAllowed\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"status\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setAdmin\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"status\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setAllowed\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"AggregatorAlreadyExists\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"AggregatorDoesNotExist\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EarlyOracleResponse\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"gasLimit\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"gasSpent\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"ExcessiveGasSpent\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expectedBalance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"receivedBalance\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"InsufficientBalance\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"InsufficientSamples\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"IntervalHistoryNotRecorded\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"expectedAuthority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"receivedAuthority\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"InvalidAuthority\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"OracleExpired\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"expectedQueueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"receivedQueueId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"QueuesDoNotMatch\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"aggregators\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"results\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"SubmittedResultsMismatch\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"AggregatorAccountInit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"funder\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AggregatorFundEvent\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"intervalId\",\"type\":\"uint256\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"balanceLeftForInterval\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AggregatorIntervalRefreshed\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"intervalId\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AggregatorOpenInterval\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"reader\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"AggregatorRead\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"oracle\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AggregatorSaveResult\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"minUpdateDelaySeconds\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"minOracleResults\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"varianceThreshold\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"minJobResults\",\"type\":\"uint256\",\"components\":[],\"indexed\":false},{\"internalType\":\"uint256\",\"name\":\"forceReportPeriod\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"AggregatorSettingsUpdated\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"AggregatorUpdate\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"funder\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AggregatorWithdrawEvent\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OraclePayoutEvent\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"aggregatorEscrowFund\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address payable\",\"name\":\"recipient\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"aggregatorEscrowWithdraw\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint80\",\"name\":\"roundId\",\"type\":\"uint80\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"aggregatorHistory\",\"outputs\":[{\"internalType\":\"struct AggregatorLib.AggregatorHistoryResult\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"medianTimestamp\",\"type\":\"uint256\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"aggregators\",\"outputs\":[{\"internalType\":\"struct AggregatorLib.Aggregator\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"struct AggregatorLib.Result\",\"name\":\"latestResult\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}]},{\"internalType\":\"struct AggregatorLib.AggregatorConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"batchSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minUpdateDelaySeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minOracleResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"varianceThreshold\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minJobResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"forceReportPeriod\",\"type\":\"uint256\",\"components\":[]}]},{\"internalType\":\"string\",\"name\":\"jobsHash\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balanceLeftForInterval\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextIntervalRefreshTime\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint80\",\"name\":\"intervalId\",\"type\":\"uint80\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"historyEnabled\",\"type\":\"bool\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"batchSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minUpdateDelaySeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minOracleResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"jobsHash\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"varianceThreshold\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minJobResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"forceReportPeriod\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"enableHistory\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"createAggregator\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAggregatorsByAuthority\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"struct AggregatorLib.Aggregator[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"struct AggregatorLib.Result\",\"name\":\"latestResult\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}]},{\"internalType\":\"struct AggregatorLib.AggregatorConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"batchSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minUpdateDelaySeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minOracleResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"varianceThreshold\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minJobResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"forceReportPeriod\",\"type\":\"uint256\",\"components\":[]}]},{\"internalType\":\"string\",\"name\":\"jobsHash\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balanceLeftForInterval\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextIntervalRefreshTime\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint80\",\"name\":\"intervalId\",\"type\":\"uint80\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"historyEnabled\",\"type\":\"bool\",\"components\":[]}]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAllAggregators\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"struct AggregatorLib.Aggregator[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"struct AggregatorLib.Result\",\"name\":\"latestResult\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}]},{\"internalType\":\"struct AggregatorLib.AggregatorConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"batchSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minUpdateDelaySeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minOracleResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"varianceThreshold\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minJobResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"forceReportPeriod\",\"type\":\"uint256\",\"components\":[]}]},{\"internalType\":\"string\",\"name\":\"jobsHash\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balanceLeftForInterval\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextIntervalRefreshTime\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint80\",\"name\":\"intervalId\",\"type\":\"uint80\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"historyEnabled\",\"type\":\"bool\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getCurrentIntervalId\",\"outputs\":[{\"internalType\":\"uint80\",\"name\":\"roundId\",\"type\":\"uint80\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint80\",\"name\":\"intervalId\",\"type\":\"uint80\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"getIntervalResult\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"medianTimestamp\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"latestResult\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"openInterval\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"ids\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"int256[]\",\"name\":\"results\",\"type\":\"int256[]\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"oracleIdx\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"saveResults\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"batchSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minUpdateDelaySeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minOracleResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"jobsHash\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"varianceThreshold\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"minJobResults\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"forceReportPeriod\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"enableHistory\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setAggregatorConfig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"viewAggregatorResults\",\"outputs\":[{\"internalType\":\"struct AggregatorLib.Result[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"aggregatorId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"viewLatestResult\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"value\",\"type\":\"int256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"AttestationQueueAlreadyExists\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"argumentIndex\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"InvalidArgument\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"type\":\"error\",\"name\":\"MrEnclaveNotAllowed\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"AddMrEnclave\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AttestationQueueAccountInit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"granter\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"permission\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"AttestationQueuePermissionUpdated\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"AttestationQueueSetConfig\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"RemoveMrEnclave\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"addMrEnclaveToAttestationQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"attestationQueueHasMrEnclave\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"attestationQueues\",\"outputs\":[{\"internalType\":\"struct AttestationQueueLib.AttestationQueue\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"data\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastHeartbeat\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes32[]\",\"name\":\"mrEnclaves\",\"type\":\"bytes32[]\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxEnclaveVerificationAge\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"allowAuthorityOverrideAfter\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxConsecutiveFunctionFailures\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireAuthorityHeartbeatPermission\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireUsagePermissions\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"enclaveTimeout\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"gcIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"currIdx\",\"type\":\"uint256\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"enclaveTimeout\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxEnclaveVerificationAge\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"allowAuthorityOverrideAfter\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireAuthorityHeartbeatPermission\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireUsagePermissions\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxConsecutiveFunctionFailures\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createAttestationQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAttestationQueueMrEnclaves\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getEnclaveIdx\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getEnclaves\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"removeMrEnclaveFromAttestationQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"enclaveTimeout\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxEnclaveVerificationAge\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"allowAuthorityOverrideAfter\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireAuthorityHeartbeatPermission\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireUsagePermissions\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxConsecutiveFunctionFailures\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setAttestationQueueConfig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"permission\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"on\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setAttestationQueuePermission\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"struct IDiamondCut.FacetCut[]\",\"name\":\"_diamondCut\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"address\",\"name\":\"facetAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"enum IDiamondCut.FacetCutAction\",\"name\":\"action\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"bytes4[]\",\"name\":\"functionSelectors\",\"type\":\"bytes4[]\",\"components\":[]}],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"_init\",\"type\":\"address\",\"components\":[],\"indexed\":false},{\"internalType\":\"bytes\",\"name\":\"_calldata\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"DiamondCut\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"struct IDiamondCut.FacetCut[]\",\"name\":\"_diamondCut\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"address\",\"name\":\"facetAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"enum IDiamondCut.FacetCutAction\",\"name\":\"action\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"bytes4[]\",\"name\":\"functionSelectors\",\"type\":\"bytes4[]\",\"components\":[]}]},{\"internalType\":\"address\",\"name\":\"_init\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"_calldata\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"diamondCut\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"_functionSelector\",\"type\":\"bytes4\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"facetAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"facetAddress_\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"facetAddresses\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"facetAddresses_\",\"type\":\"address[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_facet\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"facetFunctionSelectors\",\"outputs\":[{\"internalType\":\"bytes4[]\",\"name\":\"facetFunctionSelectors_\",\"type\":\"bytes4[]\",\"components\":[]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"facets\",\"outputs\":[{\"internalType\":\"struct IDiamondLoupe.Facet[]\",\"name\":\"facets_\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"address\",\"name\":\"facetAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes4[]\",\"name\":\"functionSelectors\",\"type\":\"bytes4[]\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"_interfaceId\",\"type\":\"bytes4\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OwnershipTransferred\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"owner_\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_newOwner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"transferOwnership\",\"outputs\":[]},{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"init\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveAlreadyExists\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveDoesNotExist\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveExpired\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"enclaveIdx\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveNotAtQueueIdx\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveNotOnQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveNotReadyForVerification\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"EnclaveUnverified\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"ForceOverrideNotReady\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"maxExpectedTime\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reportedTime\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"IncorrectReportedTime\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"InvalidEnclave\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"InvalidStatus\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"granter\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"permission\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"PermissionDenied\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"EnclaveAccountInit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"queue\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"EnclaveGC\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"EnclaveHeartbeat\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"nodeId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"EnclavePayoutEvent\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"oldAuthority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"newAuthority\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"EnclaveRotateAuthority\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"verifier\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"verifiee\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"EnclaveVerifyRequest\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createEnclave\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createEnclaveWithId\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"enclaveAuthorityToEnclaveAddress\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"enclaveIdx\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"enclaveGarbageCollect\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"enclaveHeartbeat\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"enclaves\",\"outputs\":[{\"internalType\":\"struct EnclaveLib.Enclave\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"cid\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"enum EnclaveLib.VerificationStatus\",\"name\":\"verificationStatus\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"verificationTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"validUntil\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"isOnQueue\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastHeartbeat\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"verifierId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"verifierIdx\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"failEnclave\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"forceOverrideVerify\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"isEnclaveValid\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"newAuthority\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"rotateEnclaveAuthority\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"cid\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"updateEnclave\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32[]\",\"name\":\"validMeasurements\",\"type\":\"bytes32[]\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"validate\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"verifierId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"enclaveIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"verifyEnclave\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"ACLNotAllowed\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"txHash\",\"type\":\"bytes32\",\"components\":[]}],\"type\":\"error\",\"name\":\"AlreadyExecuted\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"AttestationQueueDoesNotExist\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"FunctionAlreadyExists\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"FunctionCallerNotPermitted\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"FunctionDoesNotExist\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"expected\",\"type\":\"bytes32\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"received\",\"type\":\"bytes32\",\"components\":[]}],\"type\":\"error\",\"name\":\"FunctionMrEnclaveMismatch\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"current\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"received\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"FunctionSignerAlreadySet\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"limit\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"used\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"GasLimitExceeded\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expected\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"received\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"InsufficientNodes\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"expectedSender\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"txHash\",\"type\":\"bytes32\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"signature\",\"type\":\"bytes\",\"components\":[]}],\"type\":\"error\",\"name\":\"InvalidSignature\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"OracleAlreadyExists\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"oracleIdx\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"OracleNotAtQueueIdx\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"OracleNotOnQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleQueueId\",\"type\":\"address\",\"components\":[]}],\"type\":\"error\",\"name\":\"OracleQueueDoesNotExist\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expirationTime\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"TransactionExpired\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"callId\",\"type\":\"uint256\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes\",\"name\":\"params\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"FunctionCallEvent\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"callId\",\"type\":\"uint256\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes\",\"name\":\"params\",\"type\":\"bytes\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"FunctionCallFailure\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"funder\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"FunctionCallFund\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"params\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"callFunction\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getActiveFunctionCallsByQueue\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"struct FunctionCallLib.FunctionCall[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"caller\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"callData\",\"type\":\"bytes\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"executed\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"consecutiveFailures\",\"type\":\"uint256\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OracleAccountInit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OracleGC\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OracleHeartbeat\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[],\"indexed\":false},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OracleSetConfig\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createOracle\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createOracleWithId\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"oracleIdx\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"oracleGarbageCollect\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"oracleHeartbeat\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"oracles\",\"outputs\":[{\"internalType\":\"struct OracleLib.Oracle\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint8\",\"name\":\"numRows\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastHeartbeat\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"newAuthority\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"rotateOracleAuthority\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setOracleConfig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OracleQueueAccountInit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OracleQueueAddMrEnclave\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OracleQueueRemoveMrEnclave\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OracleQueueSetAttestationConfig\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"OracleQueueSetConfig\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"granter\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"permission\",\"type\":\"uint256\",\"components\":[],\"indexed\":false}],\"type\":\"event\",\"name\":\"OracleQueueSetPermission\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"addMrEnclaveToOracleQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"unpermissionedFeedsEnabled\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"oracleTimeout\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"createOracleQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"oracleId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOracleIdx\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOracleQueueAllowedMrEnclaves\",\"outputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"\",\"type\":\"bytes32[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getOracles\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"oracleQueues\",\"outputs\":[{\"internalType\":\"struct OracleQueueLib.OracleQueue\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"oracles\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"unpermissionedFeedsEnabled\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"oracleTimeout\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"gcIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"currIdx\",\"type\":\"uint256\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"queueAttestationConfigs\",\"outputs\":[{\"internalType\":\"struct OracleQueueLib.AttestationConfig\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32[]\",\"name\":\"mrEnclaves\",\"type\":\"bytes32[]\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireValidEnclave\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireHeartbeatPermission\",\"type\":\"bool\",\"components\":[]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"removeMrEnclaveFromOracleQueue\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"attestationQueueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes32[]\",\"name\":\"mrEnclaves\",\"type\":\"bytes32[]\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireValidEnclave\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"requireHeartbeatPermission\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setOracleQueueAttestationConfig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"unpermissionedFeedsEnabled\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"maxSize\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"oracleTimeout\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setOracleQueueConfig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"permission\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"on\",\"type\":\"bool\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setOracleQueuePermission\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"granter\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getPermission\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"granter\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"grantee\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"permission\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"hasPermission\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[],\"type\":\"error\",\"name\":\"ECDSAInvalidSignature\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"length\",\"type\":\"uint256\",\"components\":[]}],\"type\":\"error\",\"name\":\"ECDSAInvalidSignatureLength\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\",\"components\":[]}],\"type\":\"error\",\"name\":\"ECDSAInvalidSignatureS\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"FunctionAccountInit\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"funder\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"FunctionFund\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"address\",\"name\":\"withdrawer\",\"type\":\"address\",\"components\":[],\"indexed\":true},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[],\"indexed\":true}],\"type\":\"event\",\"name\":\"FunctionWithdraw\",\"outputs\":[],\"anonymous\":false},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"createFunction\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"createFunctionWithId\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"struct TransactionLib.Transaction[]\",\"name\":\"transactions\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"expirationTimeSeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"gasLimit\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\",\"components\":[]}]},{\"internalType\":\"bytes[]\",\"name\":\"signatures\",\"type\":\"bytes[]\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"forward\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"accountId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"payable\",\"type\":\"function\",\"name\":\"functionEscrowFund\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address payable\",\"name\":\"recipient\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"functionEscrowWithdraw\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setFunctionConfig\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tolerance\",\"type\":\"uint256\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"setToleratedTimestampDiscrepancy\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"enclaveIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"delegatedSignerAddress\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"observedTime\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextAllowedTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"isFailure\",\"type\":\"bool\",\"components\":[]},{\"internalType\":\"bytes32\",\"name\":\"mrEnclave\",\"type\":\"bytes32\",\"components\":[]},{\"internalType\":\"struct TransactionLib.Transaction[]\",\"name\":\"transactions\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"expirationTimeSeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"gasLimit\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\",\"components\":[]}]},{\"internalType\":\"bytes[]\",\"name\":\"signatures\",\"type\":\"bytes[]\",\"components\":[]}],\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"name\":\"verifyFunction\",\"outputs\":[]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"funcs\",\"outputs\":[{\"internalType\":\"struct FunctionLib.SbFunction\",\"name\":\"\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"enum FunctionLib.FunctionStatus\",\"name\":\"status\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"struct FunctionLib.FunctionConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]}]},{\"internalType\":\"struct FunctionLib.FunctionState\",\"name\":\"state\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"consecutiveFailures\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastExecutionTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextAllowedTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"callId\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggeredSince\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggerCount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"queueIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"triggered\",\"type\":\"bool\",\"components\":[]}]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"functionId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"functionExists\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getActiveFunctionsByQueue\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"struct FunctionLib.SbFunction[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"enum FunctionLib.FunctionStatus\",\"name\":\"status\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"struct FunctionLib.FunctionConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]}]},{\"internalType\":\"struct FunctionLib.FunctionState\",\"name\":\"state\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"consecutiveFailures\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastExecutionTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextAllowedTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"callId\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggeredSince\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggerCount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"queueIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"triggered\",\"type\":\"bool\",\"components\":[]}]}]}]},{\"inputs\":[],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getAllFunctions\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"struct FunctionLib.SbFunction[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"enum FunctionLib.FunctionStatus\",\"name\":\"status\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"struct FunctionLib.FunctionConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]}]},{\"internalType\":\"struct FunctionLib.FunctionState\",\"name\":\"state\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"consecutiveFailures\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastExecutionTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextAllowedTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"callId\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggeredSince\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggerCount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"queueIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"triggered\",\"type\":\"bool\",\"components\":[]}]}]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"user\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getFunctionsByAuthority\",\"outputs\":[{\"internalType\":\"address[]\",\"name\":\"\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"struct FunctionLib.SbFunction[]\",\"name\":\"\",\"type\":\"tuple[]\",\"components\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"authority\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"enclaveId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"queueId\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"enum FunctionLib.FunctionStatus\",\"name\":\"status\",\"type\":\"uint8\",\"components\":[]},{\"internalType\":\"struct FunctionLib.FunctionConfig\",\"name\":\"config\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"string\",\"name\":\"schedule\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"address[]\",\"name\":\"permittedCallers\",\"type\":\"address[]\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"containerRegistry\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"container\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"version\",\"type\":\"string\",\"components\":[]},{\"internalType\":\"string\",\"name\":\"paramsSchema\",\"type\":\"string\",\"components\":[]}]},{\"internalType\":\"struct FunctionLib.FunctionState\",\"name\":\"state\",\"type\":\"tuple\",\"components\":[{\"internalType\":\"uint256\",\"name\":\"consecutiveFailures\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"lastExecutionTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"nextAllowedTimestamp\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"callId\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggeredSince\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"triggerCount\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"queueIdx\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"bool\",\"name\":\"triggered\",\"type\":\"bool\",\"components\":[]}]}]}]},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"expirationTimeSeconds\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"gasLimit\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\",\"components\":[]},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\",\"components\":[]}],\"stateMutability\":\"view\",\"type\":\"function\",\"name\":\"getTransactionHash\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\",\"components\":[]}]},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\",\"components\":[]}],\"stateMutability\":\"pure\",\"type\":\"function\",\"name\":\"isTrustedForwarder\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\",\"components\":[]}]}]";
    ///The parsed JSON ABI of the contract.
    pub static SWITCHBOARD_ABI: ::ethers::contract::Lazy<::ethers::core::abi::Abi> =
        ::ethers::contract::Lazy::new(|| {
            ::ethers::core::utils::__serde_json::from_str(__ABI).expect("ABI is always valid")
        });
    pub struct Switchboard<M>(::ethers::contract::Contract<M>);
    impl<M> ::core::clone::Clone for Switchboard<M> {
        fn clone(&self) -> Self {
            Self(::core::clone::Clone::clone(&self.0))
        }
    }
    impl<M> ::core::ops::Deref for Switchboard<M> {
        type Target = ::ethers::contract::Contract<M>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
    impl<M> ::core::ops::DerefMut for Switchboard<M> {
        fn deref_mut(&mut self) -> &mut Self::Target {
            &mut self.0
        }
    }
    impl<M> ::core::fmt::Debug for Switchboard<M> {
        fn fmt(&self, f: &mut ::core::fmt::Formatter<'_>) -> ::core::fmt::Result {
            f.debug_tuple(stringify!(Switchboard))
                .field(&self.address())
                .finish()
        }
    }
    impl<M: ::ethers::providers::Middleware> Switchboard<M> {
        /// Creates a new contract instance with the specified `ethers` client at
        /// `address`. The contract derefs to a `ethers::Contract` object.
        pub fn new<T: Into<::ethers::core::types::Address>>(
            address: T,
            client: ::std::sync::Arc<M>,
        ) -> Self {
            Self(::ethers::contract::Contract::new(
                address.into(),
                SWITCHBOARD_ABI.clone(),
                client,
            ))
        }
        ///Calls the contract's `addMrEnclaveToAttestationQueue` (0xad435b9d) function
        pub fn add_mr_enclave_to_attestation_queue(
            &self,
            queue_id: ::ethers::core::types::Address,
            mr_enclave: [u8; 32],
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([173, 67, 91, 157], (queue_id, mr_enclave))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `addMrEnclaveToOracleQueue` (0x51a426d8) function
        pub fn add_mr_enclave_to_oracle_queue(
            &self,
            queue_id: ::ethers::core::types::Address,
            mr_enclave: [u8; 32],
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([81, 164, 38, 216], (queue_id, mr_enclave))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `aggregatorEscrowFund` (0xd55dcc5b) function
        pub fn aggregator_escrow_fund(
            &self,
            account_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([213, 93, 204, 91], account_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `aggregatorEscrowWithdraw` (0x202dd499) function
        pub fn aggregator_escrow_withdraw(
            &self,
            recipient: ::ethers::core::types::Address,
            aggregator_id: ::ethers::core::types::Address,
            amount: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([32, 45, 212, 153], (recipient, aggregator_id, amount))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `aggregatorHistory` (0x8625bd08) function
        pub fn aggregator_history(
            &self,
            aggregator_id: ::ethers::core::types::Address,
            round_id: u128,
        ) -> ::ethers::contract::builders::ContractCall<M, AggregatorHistoryResult> {
            self.0
                .method_hash([134, 37, 189, 8], (aggregator_id, round_id))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `aggregators` (0x112cdab9) function
        pub fn aggregators(
            &self,
            aggregator_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, Aggregator> {
            self.0
                .method_hash([17, 44, 218, 185], aggregator_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `attestationQueueHasMrEnclave` (0x63fcd771) function
        pub fn attestation_queue_has_mr_enclave(
            &self,
            queue_id: ::ethers::core::types::Address,
            mr_enclave: [u8; 32],
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([99, 252, 215, 113], (queue_id, mr_enclave))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `attestationQueues` (0x8bb3048c) function
        pub fn attestation_queues(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, AttestationQueue> {
            self.0
                .method_hash([139, 179, 4, 140], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `callFunction` (0x9c23da50) function
        pub fn call_function(
            &self,
            function_id: ::ethers::core::types::Address,
            params: ::ethers::core::types::Bytes,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([156, 35, 218, 80], (function_id, params))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `callback` (0xff585caf) function
        pub fn callback(
            &self,
            value: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([255, 88, 92, 175], value)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createAggregator` (0x84ed8177) function
        pub fn create_aggregator(
            &self,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            batch_size: ::ethers::core::types::U256,
            min_update_delay_seconds: ::ethers::core::types::U256,
            min_oracle_results: ::ethers::core::types::U256,
            jobs_hash: ::std::string::String,
            queue_id: ::ethers::core::types::Address,
            variance_threshold: ::ethers::core::types::U256,
            min_job_results: ::ethers::core::types::U256,
            force_report_period: ::ethers::core::types::U256,
            enable_history: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [132, 237, 129, 119],
                    (
                        name,
                        authority,
                        batch_size,
                        min_update_delay_seconds,
                        min_oracle_results,
                        jobs_hash,
                        queue_id,
                        variance_threshold,
                        min_job_results,
                        force_report_period,
                        enable_history,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createAttestationQueue` (0xde776851) function
        pub fn create_attestation_queue(
            &self,
            authority: ::ethers::core::types::Address,
            max_size: ::ethers::core::types::U256,
            reward: ::ethers::core::types::U256,
            enclave_timeout: ::ethers::core::types::U256,
            max_enclave_verification_age: ::ethers::core::types::U256,
            allow_authority_override_after: ::ethers::core::types::U256,
            require_authority_heartbeat_permission: bool,
            require_usage_permissions: bool,
            max_consecutive_function_failures: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [222, 119, 104, 81],
                    (
                        authority,
                        max_size,
                        reward,
                        enclave_timeout,
                        max_enclave_verification_age,
                        allow_authority_override_after,
                        require_authority_heartbeat_permission,
                        require_usage_permissions,
                        max_consecutive_function_failures,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createEnclave` (0xcf392e2f) function
        pub fn create_enclave(
            &self,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            owner: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([207, 57, 46, 47], (authority, queue_id, owner))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createEnclaveWithId` (0xc7c1143e) function
        pub fn create_enclave_with_id(
            &self,
            enclave_id: ::ethers::core::types::Address,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            owner: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([199, 193, 20, 62], (enclave_id, authority, queue_id, owner))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createFunction` (0xc4829580) function
        pub fn create_function(
            &self,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            container_registry: ::std::string::String,
            container: ::std::string::String,
            version: ::std::string::String,
            schedule: ::std::string::String,
            params_schema: ::std::string::String,
            permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [196, 130, 149, 128],
                    (
                        name,
                        authority,
                        queue_id,
                        container_registry,
                        container,
                        version,
                        schedule,
                        params_schema,
                        permitted_callers,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createFunctionWithId` (0xcd86c71b) function
        pub fn create_function_with_id(
            &self,
            function_id: ::ethers::core::types::Address,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            container_registry: ::std::string::String,
            container: ::std::string::String,
            version: ::std::string::String,
            schedule: ::std::string::String,
            params_schema: ::std::string::String,
            permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [205, 134, 199, 27],
                    (
                        function_id,
                        name,
                        authority,
                        queue_id,
                        container_registry,
                        container,
                        version,
                        schedule,
                        params_schema,
                        permitted_callers,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createOracle` (0xf843b846) function
        pub fn create_oracle(
            &self,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            owner: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([248, 67, 184, 70], (name, authority, queue_id, owner))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createOracleQueue` (0xe7675651) function
        pub fn create_oracle_queue(
            &self,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            unpermissioned_feeds_enabled: bool,
            max_size: ::ethers::core::types::U256,
            reward: ::ethers::core::types::U256,
            oracle_timeout: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [231, 103, 86, 81],
                    (
                        name,
                        authority,
                        unpermissioned_feeds_enabled,
                        max_size,
                        reward,
                        oracle_timeout,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `createOracleWithId` (0x16703130) function
        pub fn create_oracle_with_id(
            &self,
            oracle_id: ::ethers::core::types::Address,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            owner: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [22, 112, 49, 48],
                    (oracle_id, name, authority, queue_id, owner),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `diamondCut` (0x1f931c1c) function
        pub fn diamond_cut(
            &self,
            diamond_cut: ::std::vec::Vec<FacetCut>,
            init: ::ethers::core::types::Address,
            calldata: ::ethers::core::types::Bytes,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([31, 147, 28, 28], (diamond_cut, init, calldata))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `enclaveAuthorityToEnclaveAddress` (0x5a6fe378) function
        pub fn enclave_authority_to_enclave_address(
            &self,
            authority: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::Address> {
            self.0
                .method_hash([90, 111, 227, 120], authority)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `enclaveGarbageCollect` (0xc06e4eda) function
        pub fn enclave_garbage_collect(
            &self,
            enclave_id: ::ethers::core::types::Address,
            enclave_idx: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([192, 110, 78, 218], (enclave_id, enclave_idx))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `enclaveHeartbeat` (0xce834437) function
        pub fn enclave_heartbeat(
            &self,
            enclave_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([206, 131, 68, 55], enclave_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `enclaves` (0xfaeedb07) function
        pub fn enclaves(
            &self,
            enclave_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, Enclave> {
            self.0
                .method_hash([250, 238, 219, 7], enclave_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `facetAddress` (0xcdffacc6) function
        pub fn facet_address(
            &self,
            function_selector: [u8; 4],
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::Address> {
            self.0
                .method_hash([205, 255, 172, 198], function_selector)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `facetAddresses` (0x52ef6b2c) function
        pub fn facet_addresses(
            &self,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            ::std::vec::Vec<::ethers::core::types::Address>,
        > {
            self.0
                .method_hash([82, 239, 107, 44], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `facetFunctionSelectors` (0xadfca15e) function
        pub fn facet_function_selectors(
            &self,
            facet: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::std::vec::Vec<[u8; 4]>> {
            self.0
                .method_hash([173, 252, 161, 94], facet)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `facets` (0x7a0ed627) function
        pub fn facets(
            &self,
        ) -> ::ethers::contract::builders::ContractCall<M, ::std::vec::Vec<Facet>> {
            self.0
                .method_hash([122, 14, 214, 39], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `failEnclave` (0x39d920e6) function
        pub fn fail_enclave(
            &self,
            verifier_id: ::ethers::core::types::Address,
            enclave_id: ::ethers::core::types::Address,
            verifier_idx: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([57, 217, 32, 230], (verifier_id, enclave_id, verifier_idx))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `forceOverrideVerify` (0xe231b12f) function
        pub fn force_override_verify(
            &self,
            enclave_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([226, 49, 177, 47], enclave_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `forward` (0x7096052c) function
        pub fn forward(
            &self,
            transactions: ::std::vec::Vec<Transaction>,
            signatures: ::std::vec::Vec<::ethers::core::types::Bytes>,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([112, 150, 5, 44], (transactions, signatures))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `funcs` (0x8ef92003) function
        pub fn funcs(
            &self,
            function_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, SbFunction> {
            self.0
                .method_hash([142, 249, 32, 3], function_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `functionEscrowFund` (0xba93166c) function
        pub fn function_escrow_fund(
            &self,
            account_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([186, 147, 22, 108], account_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `functionEscrowWithdraw` (0xa29baf1e) function
        pub fn function_escrow_withdraw(
            &self,
            recipient: ::ethers::core::types::Address,
            function_id: ::ethers::core::types::Address,
            amount: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([162, 155, 175, 30], (recipient, function_id, amount))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `functionExists` (0xa13001c9) function
        pub fn function_exists(
            &self,
            function_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([161, 48, 1, 201], function_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getActiveFunctionCallsByQueue` (0xfa88c651) function
        pub fn get_active_function_calls_by_queue(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::std::vec::Vec<::ethers::core::types::Address>,
                ::std::vec::Vec<FunctionCall>,
            ),
        > {
            self.0
                .method_hash([250, 136, 198, 81], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getActiveFunctionsByQueue` (0x1fc747b7) function
        pub fn get_active_functions_by_queue(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::std::vec::Vec<::ethers::core::types::Address>,
                ::std::vec::Vec<SbFunction>,
            ),
        > {
            self.0
                .method_hash([31, 199, 71, 183], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getAggregatorsByAuthority` (0x911c30f3) function
        pub fn get_aggregators_by_authority(
            &self,
            user: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::std::vec::Vec<::ethers::core::types::Address>,
                ::std::vec::Vec<Aggregator>,
            ),
        > {
            self.0
                .method_hash([145, 28, 48, 243], user)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getAllAggregators` (0x465c65dd) function
        pub fn get_all_aggregators(
            &self,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::std::vec::Vec<::ethers::core::types::Address>,
                ::std::vec::Vec<Aggregator>,
            ),
        > {
            self.0
                .method_hash([70, 92, 101, 221], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getAllFunctions` (0xab6418b4) function
        pub fn get_all_functions(
            &self,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::std::vec::Vec<::ethers::core::types::Address>,
                ::std::vec::Vec<SbFunction>,
            ),
        > {
            self.0
                .method_hash([171, 100, 24, 180], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getAttestationQueueMrEnclaves` (0x0f3bc418) function
        pub fn get_attestation_queue_mr_enclaves(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::std::vec::Vec<[u8; 32]>> {
            self.0
                .method_hash([15, 59, 196, 24], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getCurrentIntervalId` (0x1dc1da86) function
        pub fn get_current_interval_id(
            &self,
            aggregator_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, u128> {
            self.0
                .method_hash([29, 193, 218, 134], aggregator_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getEnclaveIdx` (0x21fb3bbc) function
        pub fn get_enclave_idx(
            &self,
            enclave_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::I256> {
            self.0
                .method_hash([33, 251, 59, 188], enclave_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getEnclaves` (0x340dd88b) function
        pub fn get_enclaves(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            ::std::vec::Vec<::ethers::core::types::Address>,
        > {
            self.0
                .method_hash([52, 13, 216, 139], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getFunctionsByAuthority` (0x357f633f) function
        pub fn get_functions_by_authority(
            &self,
            user: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::std::vec::Vec<::ethers::core::types::Address>,
                ::std::vec::Vec<SbFunction>,
            ),
        > {
            self.0
                .method_hash([53, 127, 99, 63], user)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getIntervalResult` (0x3d24ef6e) function
        pub fn get_interval_result(
            &self,
            aggregator_id: ::ethers::core::types::Address,
            interval_id: u128,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (
                ::ethers::core::types::I256,
                ::ethers::core::types::U256,
                ::ethers::core::types::U256,
            ),
        > {
            self.0
                .method_hash([61, 36, 239, 110], (aggregator_id, interval_id))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getOracleIdx` (0xd87dd0ac) function
        pub fn get_oracle_idx(
            &self,
            oracle_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::I256> {
            self.0
                .method_hash([216, 125, 208, 172], oracle_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getOracleQueueAllowedMrEnclaves` (0xf04b0f59) function
        pub fn get_oracle_queue_allowed_mr_enclaves(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::std::vec::Vec<[u8; 32]>> {
            self.0
                .method_hash([240, 75, 15, 89], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getOracles` (0x8e749281) function
        pub fn get_oracles(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            ::std::vec::Vec<::ethers::core::types::Address>,
        > {
            self.0
                .method_hash([142, 116, 146, 129], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getPermission` (0x910185dd) function
        pub fn get_permission(
            &self,
            granter: ::ethers::core::types::Address,
            grantee: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::U256> {
            self.0
                .method_hash([145, 1, 133, 221], (granter, grantee))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `getTransactionHash` (0xd93f1970) function
        pub fn get_transaction_hash(
            &self,
            expiration_time_seconds: ::ethers::core::types::U256,
            gas_limit: ::ethers::core::types::U256,
            value: ::ethers::core::types::U256,
            to: ::ethers::core::types::Address,
            from: ::ethers::core::types::Address,
            data: ::ethers::core::types::Bytes,
        ) -> ::ethers::contract::builders::ContractCall<M, [u8; 32]> {
            self.0
                .method_hash(
                    [217, 63, 25, 112],
                    (expiration_time_seconds, gas_limit, value, to, from, data),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `hasPermission` (0x8b01813d) function
        pub fn has_permission(
            &self,
            granter: ::ethers::core::types::Address,
            grantee: ::ethers::core::types::Address,
            permission: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([139, 1, 129, 61], (granter, grantee, permission))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `init` (0xe1c7392a) function
        pub fn init(&self) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([225, 199, 57, 42], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `initialize` (0x8129fc1c) function
        pub fn initialize(&self) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([129, 41, 252, 28], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `isAdmin` (0x24d7806c) function
        pub fn is_admin(
            &self,
            sender: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([36, 215, 128, 108], sender)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `isAllowed` (0xbabcc539) function
        pub fn is_allowed(
            &self,
            sender: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([186, 188, 197, 57], sender)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `isEnclaveValid` (0xfb4acdfe) function
        pub fn is_enclave_valid(
            &self,
            enclave_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([251, 74, 205, 254], enclave_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `isTrustedForwarder` (0x572b6c05) function
        pub fn is_trusted_forwarder(
            &self,
            p0: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([87, 43, 108, 5], p0)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `latestResult` (0xfab005a2) function
        pub fn latest_result(
            &self,
            aggregator_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (::ethers::core::types::I256, ::ethers::core::types::U256),
        > {
            self.0
                .method_hash([250, 176, 5, 162], aggregator_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `openInterval` (0x0f2544be) function
        pub fn open_interval(
            &self,
            aggregator_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([15, 37, 68, 190], aggregator_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `oracleGarbageCollect` (0x71da68ff) function
        pub fn oracle_garbage_collect(
            &self,
            oracle_id: ::ethers::core::types::Address,
            oracle_idx: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([113, 218, 104, 255], (oracle_id, oracle_idx))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `oracleHeartbeat` (0xf53b638c) function
        pub fn oracle_heartbeat(
            &self,
            oracle_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([245, 59, 99, 140], oracle_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `oracleQueues` (0xf2378e88) function
        pub fn oracle_queues(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, OracleQueue> {
            self.0
                .method_hash([242, 55, 142, 136], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `oracles` (0xaddd5099) function
        pub fn oracles(
            &self,
            oracle_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, Oracle> {
            self.0
                .method_hash([173, 221, 80, 153], oracle_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `owner` (0x8da5cb5b) function
        pub fn owner(
            &self,
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::Address> {
            self.0
                .method_hash([141, 165, 203, 91], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `queueAttestationConfigs` (0x6ddc9122) function
        pub fn queue_attestation_configs(
            &self,
            queue_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, AttestationConfig> {
            self.0
                .method_hash([109, 220, 145, 34], queue_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `randomValue` (0x276801ec) function
        pub fn random_value(
            &self,
        ) -> ::ethers::contract::builders::ContractCall<M, ::ethers::core::types::U256> {
            self.0
                .method_hash([39, 104, 1, 236], ())
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `removeMrEnclaveFromAttestationQueue` (0x083f30cf) function
        pub fn remove_mr_enclave_from_attestation_queue(
            &self,
            queue_id: ::ethers::core::types::Address,
            mr_enclave: [u8; 32],
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([8, 63, 48, 207], (queue_id, mr_enclave))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `removeMrEnclaveFromOracleQueue` (0x262955d8) function
        pub fn remove_mr_enclave_from_oracle_queue(
            &self,
            queue_id: ::ethers::core::types::Address,
            mr_enclave: [u8; 32],
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([38, 41, 85, 216], (queue_id, mr_enclave))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `rotateEnclaveAuthority` (0xd4d832aa) function
        pub fn rotate_enclave_authority(
            &self,
            enclave_id: ::ethers::core::types::Address,
            new_authority: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([212, 216, 50, 170], (enclave_id, new_authority))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `rotateOracleAuthority` (0x4cfb1758) function
        pub fn rotate_oracle_authority(
            &self,
            oracle_id: ::ethers::core::types::Address,
            new_authority: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([76, 251, 23, 88], (oracle_id, new_authority))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `saveResults` (0x735e3555) function
        pub fn save_results(
            &self,
            ids: ::std::vec::Vec<::ethers::core::types::Address>,
            results: ::std::vec::Vec<::ethers::core::types::I256>,
            queue_id: ::ethers::core::types::Address,
            oracle_idx: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([115, 94, 53, 85], (ids, results, queue_id, oracle_idx))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setAdmin` (0x4b0bddd2) function
        pub fn set_admin(
            &self,
            sender: ::ethers::core::types::Address,
            status: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([75, 11, 221, 210], (sender, status))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setAggregatorConfig` (0xdd0ad73a) function
        pub fn set_aggregator_config(
            &self,
            aggregator_id: ::ethers::core::types::Address,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            batch_size: ::ethers::core::types::U256,
            min_update_delay_seconds: ::ethers::core::types::U256,
            min_oracle_results: ::ethers::core::types::U256,
            jobs_hash: ::std::string::String,
            queue_id: ::ethers::core::types::Address,
            variance_threshold: ::ethers::core::types::U256,
            min_job_results: ::ethers::core::types::U256,
            force_report_period: ::ethers::core::types::U256,
            enable_history: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [221, 10, 215, 58],
                    (
                        aggregator_id,
                        name,
                        authority,
                        batch_size,
                        min_update_delay_seconds,
                        min_oracle_results,
                        jobs_hash,
                        queue_id,
                        variance_threshold,
                        min_job_results,
                        force_report_period,
                        enable_history,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setAllowed` (0x4697f05d) function
        pub fn set_allowed(
            &self,
            sender: ::ethers::core::types::Address,
            status: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([70, 151, 240, 93], (sender, status))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setAttestationQueueConfig` (0xf7d48307) function
        pub fn set_attestation_queue_config(
            &self,
            queue_id: ::ethers::core::types::Address,
            authority: ::ethers::core::types::Address,
            max_size: ::ethers::core::types::U256,
            reward: ::ethers::core::types::U256,
            enclave_timeout: ::ethers::core::types::U256,
            max_enclave_verification_age: ::ethers::core::types::U256,
            allow_authority_override_after: ::ethers::core::types::U256,
            require_authority_heartbeat_permission: bool,
            require_usage_permissions: bool,
            max_consecutive_function_failures: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [247, 212, 131, 7],
                    (
                        queue_id,
                        authority,
                        max_size,
                        reward,
                        enclave_timeout,
                        max_enclave_verification_age,
                        allow_authority_override_after,
                        require_authority_heartbeat_permission,
                        require_usage_permissions,
                        max_consecutive_function_failures,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setAttestationQueuePermission` (0xa77a07d3) function
        pub fn set_attestation_queue_permission(
            &self,
            queue_id: ::ethers::core::types::Address,
            grantee: ::ethers::core::types::Address,
            permission: ::ethers::core::types::U256,
            on: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([167, 122, 7, 211], (queue_id, grantee, permission, on))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setFunctionConfig` (0x822e99d5) function
        pub fn set_function_config(
            &self,
            function_id: ::ethers::core::types::Address,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            container_registry: ::std::string::String,
            container: ::std::string::String,
            version: ::std::string::String,
            schedule: ::std::string::String,
            params_schema: ::std::string::String,
            permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [130, 46, 153, 213],
                    (
                        function_id,
                        name,
                        authority,
                        container_registry,
                        container,
                        version,
                        schedule,
                        params_schema,
                        permitted_callers,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setOracleConfig` (0xf50b5ed0) function
        pub fn set_oracle_config(
            &self,
            oracle_id: ::ethers::core::types::Address,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            queue_id: ::ethers::core::types::Address,
            owner: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [245, 11, 94, 208],
                    (oracle_id, name, authority, queue_id, owner),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setOracleQueueAttestationConfig` (0x88033af5) function
        pub fn set_oracle_queue_attestation_config(
            &self,
            queue_id: ::ethers::core::types::Address,
            attestation_queue_id: ::ethers::core::types::Address,
            mr_enclaves: ::std::vec::Vec<[u8; 32]>,
            require_valid_enclave: bool,
            require_heartbeat_permission: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [136, 3, 58, 245],
                    (
                        queue_id,
                        attestation_queue_id,
                        mr_enclaves,
                        require_valid_enclave,
                        require_heartbeat_permission,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setOracleQueueConfig` (0xb6590411) function
        pub fn set_oracle_queue_config(
            &self,
            queue_id: ::ethers::core::types::Address,
            name: ::std::string::String,
            authority: ::ethers::core::types::Address,
            unpermissioned_feeds_enabled: bool,
            max_size: ::ethers::core::types::U256,
            reward: ::ethers::core::types::U256,
            oracle_timeout: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [182, 89, 4, 17],
                    (
                        queue_id,
                        name,
                        authority,
                        unpermissioned_feeds_enabled,
                        max_size,
                        reward,
                        oracle_timeout,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setOracleQueuePermission` (0x01fc1ba2) function
        pub fn set_oracle_queue_permission(
            &self,
            queue_id: ::ethers::core::types::Address,
            grantee: ::ethers::core::types::Address,
            permission: ::ethers::core::types::U256,
            on: bool,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([1, 252, 27, 162], (queue_id, grantee, permission, on))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `setToleratedTimestampDiscrepancy` (0x101277b2) function
        pub fn set_tolerated_timestamp_discrepancy(
            &self,
            tolerance: ::ethers::core::types::U256,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([16, 18, 119, 178], tolerance)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `supportsInterface` (0x01ffc9a7) function
        pub fn supports_interface(
            &self,
            interface_id: [u8; 4],
        ) -> ::ethers::contract::builders::ContractCall<M, bool> {
            self.0
                .method_hash([1, 255, 201, 167], interface_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `transferOwnership` (0xf2fde38b) function
        pub fn transfer_ownership(
            &self,
            new_owner: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([242, 253, 227, 139], new_owner)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `updateEnclave` (0x5cd6ac0c) function
        pub fn update_enclave(
            &self,
            enclave_id: ::ethers::core::types::Address,
            cid: ::ethers::core::types::Bytes,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash([92, 214, 172, 12], (enclave_id, cid))
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `validate` (0x1755a7f8) function
        pub fn validate(
            &self,
            authority: ::ethers::core::types::Address,
            attestation_queue_id: ::ethers::core::types::Address,
            valid_measurements: ::std::vec::Vec<[u8; 32]>,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [23, 85, 167, 248],
                    (authority, attestation_queue_id, valid_measurements),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `verifyEnclave` (0xef0ebd71) function
        pub fn verify_enclave(
            &self,
            verifier_id: ::ethers::core::types::Address,
            enclave_id: ::ethers::core::types::Address,
            enclave_idx: ::ethers::core::types::U256,
            timestamp: ::ethers::core::types::U256,
            mr_enclave: [u8; 32],
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [239, 14, 189, 113],
                    (verifier_id, enclave_id, enclave_idx, timestamp, mr_enclave),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `verifyFunction` (0x8cc5b02c) function
        pub fn verify_function(
            &self,
            enclave_idx: ::ethers::core::types::U256,
            function_id: ::ethers::core::types::Address,
            delegated_signer_address: ::ethers::core::types::Address,
            observed_time: ::ethers::core::types::U256,
            next_allowed_timestamp: ::ethers::core::types::U256,
            is_failure: bool,
            mr_enclave: [u8; 32],
            transactions: ::std::vec::Vec<Transaction>,
            signatures: ::std::vec::Vec<::ethers::core::types::Bytes>,
        ) -> ::ethers::contract::builders::ContractCall<M, ()> {
            self.0
                .method_hash(
                    [140, 197, 176, 44],
                    (
                        enclave_idx,
                        function_id,
                        delegated_signer_address,
                        observed_time,
                        next_allowed_timestamp,
                        is_failure,
                        mr_enclave,
                        transactions,
                        signatures,
                    ),
                )
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `viewAggregatorResults` (0xde866484) function
        pub fn view_aggregator_results(
            &self,
            aggregator_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<M, ::std::vec::Vec<Result>> {
            self.0
                .method_hash([222, 134, 100, 132], aggregator_id)
                .expect("method not found (this should never happen)")
        }
        ///Calls the contract's `viewLatestResult` (0xbdf5edef) function
        pub fn view_latest_result(
            &self,
            aggregator_id: ::ethers::core::types::Address,
        ) -> ::ethers::contract::builders::ContractCall<
            M,
            (::ethers::core::types::I256, ::ethers::core::types::U256),
        > {
            self.0
                .method_hash([189, 245, 237, 239], aggregator_id)
                .expect("method not found (this should never happen)")
        }
        ///Gets the contract's `AddMrEnclave` event
        pub fn add_mr_enclave_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AddMrEnclaveFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorAccountInit` event
        pub fn aggregator_account_init_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AggregatorAccountInitFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorFundEvent` event
        pub fn aggregator_fund_event_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AggregatorFundEventFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorIntervalRefreshed` event
        pub fn aggregator_interval_refreshed_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            AggregatorIntervalRefreshedFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `AggregatorOpenInterval` event
        pub fn aggregator_open_interval_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AggregatorOpenIntervalFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorRead` event
        pub fn aggregator_read_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AggregatorReadFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorSaveResult` event
        pub fn aggregator_save_result_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AggregatorSaveResultFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorSettingsUpdated` event
        pub fn aggregator_settings_updated_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            AggregatorSettingsUpdatedFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `AggregatorUpdate` event
        pub fn aggregator_update_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, AggregatorUpdateFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `AggregatorWithdrawEvent` event
        pub fn aggregator_withdraw_event_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            AggregatorWithdrawEventFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `AttestationQueueAccountInit` event
        pub fn attestation_queue_account_init_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            AttestationQueueAccountInitFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `AttestationQueuePermissionUpdated` event
        pub fn attestation_queue_permission_updated_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            AttestationQueuePermissionUpdatedFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `AttestationQueueSetConfig` event
        pub fn attestation_queue_set_config_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            AttestationQueueSetConfigFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `DiamondCut` event
        pub fn diamond_cut_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, DiamondCutFilter> {
            self.0.event()
        }
        ///Gets the contract's `EnclaveAccountInit` event
        pub fn enclave_account_init_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, EnclaveAccountInitFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `EnclaveGC` event
        pub fn enclave_gc_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, EnclaveGCFilter> {
            self.0.event()
        }
        ///Gets the contract's `EnclaveHeartbeat` event
        pub fn enclave_heartbeat_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, EnclaveHeartbeatFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `EnclavePayoutEvent` event
        pub fn enclave_payout_event_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, EnclavePayoutEventFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `EnclaveRotateAuthority` event
        pub fn enclave_rotate_authority_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, EnclaveRotateAuthorityFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `EnclaveVerifyRequest` event
        pub fn enclave_verify_request_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, EnclaveVerifyRequestFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `FunctionAccountInit` event
        pub fn function_account_init_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, FunctionAccountInitFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `FunctionCallEvent` event
        pub fn function_call_event_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, FunctionCallEventFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `FunctionCallFailure` event
        pub fn function_call_failure_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, FunctionCallFailureFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `FunctionCallFund` event
        pub fn function_call_fund_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, FunctionCallFundFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `FunctionFund` event
        pub fn function_fund_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, FunctionFundFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `FunctionWithdraw` event
        pub fn function_withdraw_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, FunctionWithdrawFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `NewRandomValue` event
        pub fn new_random_value_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, NewRandomValueFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OracleAccountInit` event
        pub fn oracle_account_init_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OracleAccountInitFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OracleGC` event
        pub fn oracle_gc_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OracleGCFilter> {
            self.0.event()
        }
        ///Gets the contract's `OracleHeartbeat` event
        pub fn oracle_heartbeat_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OracleHeartbeatFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OraclePayoutEvent` event
        pub fn oracle_payout_event_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OraclePayoutEventFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OracleQueueAccountInit` event
        pub fn oracle_queue_account_init_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OracleQueueAccountInitFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OracleQueueAddMrEnclave` event
        pub fn oracle_queue_add_mr_enclave_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            OracleQueueAddMrEnclaveFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `OracleQueueRemoveMrEnclave` event
        pub fn oracle_queue_remove_mr_enclave_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            OracleQueueRemoveMrEnclaveFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `OracleQueueSetAttestationConfig` event
        pub fn oracle_queue_set_attestation_config_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            OracleQueueSetAttestationConfigFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `OracleQueueSetConfig` event
        pub fn oracle_queue_set_config_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OracleQueueSetConfigFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OracleQueueSetPermission` event
        pub fn oracle_queue_set_permission_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<
            ::std::sync::Arc<M>,
            M,
            OracleQueueSetPermissionFilter,
        > {
            self.0.event()
        }
        ///Gets the contract's `OracleSetConfig` event
        pub fn oracle_set_config_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OracleSetConfigFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `OwnershipTransferred` event
        pub fn ownership_transferred_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, OwnershipTransferredFilter>
        {
            self.0.event()
        }
        ///Gets the contract's `RemoveMrEnclave` event
        pub fn remove_mr_enclave_filter(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, RemoveMrEnclaveFilter>
        {
            self.0.event()
        }
        /// Returns an `Event` builder for all the events of this contract.
        pub fn events(
            &self,
        ) -> ::ethers::contract::builders::Event<::std::sync::Arc<M>, M, SwitchboardEvents>
        {
            self.0
                .event_with_filter(::core::default::Default::default())
        }
    }
    impl<M: ::ethers::providers::Middleware> From<::ethers::contract::Contract<M>> for Switchboard<M> {
        fn from(contract: ::ethers::contract::Contract<M>) -> Self {
            Self::new(contract.address(), contract.client())
        }
    }
    ///Custom Error type `ACLAdminAlreadyInitialized` with signature `ACLAdminAlreadyInitialized()` and selector `0x7373cb0d`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "ACLAdminAlreadyInitialized",
        abi = "ACLAdminAlreadyInitialized()"
    )]
    pub struct ACLAdminAlreadyInitialized;
    ///Custom Error type `ACLNotAdmin` with signature `ACLNotAdmin(address)` and selector `0x00ea207e`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "ACLNotAdmin", abi = "ACLNotAdmin(address)")]
    pub struct ACLNotAdmin {
        pub account: ::ethers::core::types::Address,
    }
    ///Custom Error type `ACLNotAllowed` with signature `ACLNotAllowed(address)` and selector `0xea9a4ba0`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "ACLNotAllowed", abi = "ACLNotAllowed(address)")]
    pub struct ACLNotAllowed {
        pub account: ::ethers::core::types::Address,
    }
    ///Custom Error type `AggregatorAlreadyExists` with signature `AggregatorAlreadyExists(address)` and selector `0xe65d3ee3`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "AggregatorAlreadyExists",
        abi = "AggregatorAlreadyExists(address)"
    )]
    pub struct AggregatorAlreadyExists {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `AggregatorDoesNotExist` with signature `AggregatorDoesNotExist(address)` and selector `0x863b154f`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "AggregatorDoesNotExist",
        abi = "AggregatorDoesNotExist(address)"
    )]
    pub struct AggregatorDoesNotExist {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `AlreadyExecuted` with signature `AlreadyExecuted(bytes32)` and selector `0xd1d36dcd`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "AlreadyExecuted", abi = "AlreadyExecuted(bytes32)")]
    pub struct AlreadyExecuted {
        pub tx_hash: [u8; 32],
    }
    ///Custom Error type `AttestationQueueAlreadyExists` with signature `AttestationQueueAlreadyExists(address)` and selector `0x1179fb25`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "AttestationQueueAlreadyExists",
        abi = "AttestationQueueAlreadyExists(address)"
    )]
    pub struct AttestationQueueAlreadyExists {
        pub attestation_queue_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `AttestationQueueDoesNotExist` with signature `AttestationQueueDoesNotExist(address)` and selector `0x0da329cf`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "AttestationQueueDoesNotExist",
        abi = "AttestationQueueDoesNotExist(address)"
    )]
    pub struct AttestationQueueDoesNotExist {
        pub attestation_queue_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `ECDSAInvalidSignature` with signature `ECDSAInvalidSignature()` and selector `0xf645eedf`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "ECDSAInvalidSignature", abi = "ECDSAInvalidSignature()")]
    pub struct ECDSAInvalidSignature;
    ///Custom Error type `ECDSAInvalidSignatureLength` with signature `ECDSAInvalidSignatureLength(uint256)` and selector `0xfce698f7`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "ECDSAInvalidSignatureLength",
        abi = "ECDSAInvalidSignatureLength(uint256)"
    )]
    pub struct ECDSAInvalidSignatureLength {
        pub length: ::ethers::core::types::U256,
    }
    ///Custom Error type `ECDSAInvalidSignatureS` with signature `ECDSAInvalidSignatureS(bytes32)` and selector `0xd78bce0c`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "ECDSAInvalidSignatureS",
        abi = "ECDSAInvalidSignatureS(bytes32)"
    )]
    pub struct ECDSAInvalidSignatureS {
        pub s: [u8; 32],
    }
    ///Custom Error type `EarlyOracleResponse` with signature `EarlyOracleResponse(address)` and selector `0x9fcea1ba`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "EarlyOracleResponse", abi = "EarlyOracleResponse(address)")]
    pub struct EarlyOracleResponse {
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `EnclaveAlreadyExists` with signature `EnclaveAlreadyExists(address)` and selector `0x3af924d6`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "EnclaveAlreadyExists", abi = "EnclaveAlreadyExists(address)")]
    pub struct EnclaveAlreadyExists {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `EnclaveDoesNotExist` with signature `EnclaveDoesNotExist(address)` and selector `0x5c3197cc`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "EnclaveDoesNotExist", abi = "EnclaveDoesNotExist(address)")]
    pub struct EnclaveDoesNotExist {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `EnclaveExpired` with signature `EnclaveExpired(address)` and selector `0xbc41a993`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "EnclaveExpired", abi = "EnclaveExpired(address)")]
    pub struct EnclaveExpired {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `EnclaveNotAtQueueIdx` with signature `EnclaveNotAtQueueIdx(address,address,uint256)` and selector `0x1967584e`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "EnclaveNotAtQueueIdx",
        abi = "EnclaveNotAtQueueIdx(address,address,uint256)"
    )]
    pub struct EnclaveNotAtQueueIdx {
        pub queue_id: ::ethers::core::types::Address,
        pub enclave_id: ::ethers::core::types::Address,
        pub enclave_idx: ::ethers::core::types::U256,
    }
    ///Custom Error type `EnclaveNotOnQueue` with signature `EnclaveNotOnQueue(address,address)` and selector `0x4d7fe4fc`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "EnclaveNotOnQueue", abi = "EnclaveNotOnQueue(address,address)")]
    pub struct EnclaveNotOnQueue {
        pub queue_id: ::ethers::core::types::Address,
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `EnclaveNotReadyForVerification` with signature `EnclaveNotReadyForVerification(address)` and selector `0x089afb2c`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "EnclaveNotReadyForVerification",
        abi = "EnclaveNotReadyForVerification(address)"
    )]
    pub struct EnclaveNotReadyForVerification {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `EnclaveUnverified` with signature `EnclaveUnverified(address)` and selector `0x9eb833a0`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "EnclaveUnverified", abi = "EnclaveUnverified(address)")]
    pub struct EnclaveUnverified {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `ExcessiveGasSpent` with signature `ExcessiveGasSpent(uint256,uint256)` and selector `0x67c42515`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "ExcessiveGasSpent", abi = "ExcessiveGasSpent(uint256,uint256)")]
    pub struct ExcessiveGasSpent {
        pub gas_limit: ::ethers::core::types::U256,
        pub gas_spent: ::ethers::core::types::U256,
    }
    ///Custom Error type `ForceOverrideNotReady` with signature `ForceOverrideNotReady(address)` and selector `0xb209a6cc`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "ForceOverrideNotReady", abi = "ForceOverrideNotReady(address)")]
    pub struct ForceOverrideNotReady {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `FunctionAlreadyExists` with signature `FunctionAlreadyExists(address)` and selector `0x8f939dfd`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "FunctionAlreadyExists", abi = "FunctionAlreadyExists(address)")]
    pub struct FunctionAlreadyExists {
        pub function_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `FunctionCallerNotPermitted` with signature `FunctionCallerNotPermitted(address,address)` and selector `0x3926c8c8`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "FunctionCallerNotPermitted",
        abi = "FunctionCallerNotPermitted(address,address)"
    )]
    pub struct FunctionCallerNotPermitted {
        pub function_id: ::ethers::core::types::Address,
        pub sender: ::ethers::core::types::Address,
    }
    ///Custom Error type `FunctionDoesNotExist` with signature `FunctionDoesNotExist(address)` and selector `0x3c3b1d62`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "FunctionDoesNotExist", abi = "FunctionDoesNotExist(address)")]
    pub struct FunctionDoesNotExist {
        pub function_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `FunctionMrEnclaveMismatch` with signature `FunctionMrEnclaveMismatch(bytes32,bytes32)` and selector `0x552d918e`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "FunctionMrEnclaveMismatch",
        abi = "FunctionMrEnclaveMismatch(bytes32,bytes32)"
    )]
    pub struct FunctionMrEnclaveMismatch {
        pub expected: [u8; 32],
        pub received: [u8; 32],
    }
    ///Custom Error type `FunctionSignerAlreadySet` with signature `FunctionSignerAlreadySet(address,address)` and selector `0xe2c62da7`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "FunctionSignerAlreadySet",
        abi = "FunctionSignerAlreadySet(address,address)"
    )]
    pub struct FunctionSignerAlreadySet {
        pub current: ::ethers::core::types::Address,
        pub received: ::ethers::core::types::Address,
    }
    ///Custom Error type `GasLimitExceeded` with signature `GasLimitExceeded(uint256,uint256)` and selector `0x1935f531`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "GasLimitExceeded", abi = "GasLimitExceeded(uint256,uint256)")]
    pub struct GasLimitExceeded {
        pub limit: ::ethers::core::types::U256,
        pub used: ::ethers::core::types::U256,
    }
    ///Custom Error type `IncorrectReportedTime` with signature `IncorrectReportedTime(uint256,uint256)` and selector `0x3ff1de92`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "IncorrectReportedTime",
        abi = "IncorrectReportedTime(uint256,uint256)"
    )]
    pub struct IncorrectReportedTime {
        pub max_expected_time: ::ethers::core::types::U256,
        pub reported_time: ::ethers::core::types::U256,
    }
    ///Custom Error type `InitializationFunctionReverted` with signature `InitializationFunctionReverted(address,bytes)` and selector `0x192105d7`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "InitializationFunctionReverted",
        abi = "InitializationFunctionReverted(address,bytes)"
    )]
    pub struct InitializationFunctionReverted {
        pub initialization_contract_address: ::ethers::core::types::Address,
        pub calldata: ::ethers::core::types::Bytes,
    }
    ///Custom Error type `InsufficientBalance` with signature `InsufficientBalance(uint256,uint256)` and selector `0xcf479181`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "InsufficientBalance",
        abi = "InsufficientBalance(uint256,uint256)"
    )]
    pub struct InsufficientBalance {
        pub expected_balance: ::ethers::core::types::U256,
        pub received_balance: ::ethers::core::types::U256,
    }
    ///Custom Error type `InsufficientNodes` with signature `InsufficientNodes(uint256,uint256)` and selector `0x3c1222b1`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "InsufficientNodes", abi = "InsufficientNodes(uint256,uint256)")]
    pub struct InsufficientNodes {
        pub expected: ::ethers::core::types::U256,
        pub received: ::ethers::core::types::U256,
    }
    ///Custom Error type `InsufficientSamples` with signature `InsufficientSamples(uint256,uint256)` and selector `0x53b15160`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "InsufficientSamples",
        abi = "InsufficientSamples(uint256,uint256)"
    )]
    pub struct InsufficientSamples {
        pub expected: ::ethers::core::types::U256,
        pub received: ::ethers::core::types::U256,
    }
    ///Custom Error type `IntervalHistoryNotRecorded` with signature `IntervalHistoryNotRecorded(address)` and selector `0xedfa5607`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "IntervalHistoryNotRecorded",
        abi = "IntervalHistoryNotRecorded(address)"
    )]
    pub struct IntervalHistoryNotRecorded {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `InvalidArgument` with signature `InvalidArgument(uint256)` and selector `0xd14e7c9b`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "InvalidArgument", abi = "InvalidArgument(uint256)")]
    pub struct InvalidArgument {
        pub argument_index: ::ethers::core::types::U256,
    }
    ///Custom Error type `InvalidAuthority` with signature `InvalidAuthority(address,address)` and selector `0xbf89df83`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "InvalidAuthority", abi = "InvalidAuthority(address,address)")]
    pub struct InvalidAuthority {
        pub expected_authority: ::ethers::core::types::Address,
        pub received_authority: ::ethers::core::types::Address,
    }
    ///Custom Error type `InvalidEnclave` with signature `InvalidEnclave(address)` and selector `0x8bec1a4e`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "InvalidEnclave", abi = "InvalidEnclave(address)")]
    pub struct InvalidEnclave {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `InvalidEntry` with signature `InvalidEntry()` and selector `0x887efaa5`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "InvalidEntry", abi = "InvalidEntry()")]
    pub struct InvalidEntry;
    ///Custom Error type `InvalidSignature` with signature `InvalidSignature(address,bytes32,bytes)` and selector `0xd491963d`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "InvalidSignature",
        abi = "InvalidSignature(address,bytes32,bytes)"
    )]
    pub struct InvalidSignature {
        pub expected_sender: ::ethers::core::types::Address,
        pub tx_hash: [u8; 32],
        pub signature: ::ethers::core::types::Bytes,
    }
    ///Custom Error type `InvalidStatus` with signature `InvalidStatus(address,uint256,uint256)` and selector `0xee56daf8`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "InvalidStatus", abi = "InvalidStatus(address,uint256,uint256)")]
    pub struct InvalidStatus {
        pub account: ::ethers::core::types::Address,
        pub expected: ::ethers::core::types::U256,
        pub received: ::ethers::core::types::U256,
    }
    ///Custom Error type `MrEnclaveNotAllowed` with signature `MrEnclaveNotAllowed(address,bytes32)` and selector `0x93fc1a13`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "MrEnclaveNotAllowed",
        abi = "MrEnclaveNotAllowed(address,bytes32)"
    )]
    pub struct MrEnclaveNotAllowed {
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Custom Error type `OracleAlreadyExists` with signature `OracleAlreadyExists(address)` and selector `0x07fefd1f`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "OracleAlreadyExists", abi = "OracleAlreadyExists(address)")]
    pub struct OracleAlreadyExists {
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `OracleExpired` with signature `OracleExpired(address)` and selector `0xf7eac043`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "OracleExpired", abi = "OracleExpired(address)")]
    pub struct OracleExpired {
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `OracleNotAtQueueIdx` with signature `OracleNotAtQueueIdx(address,address,uint256)` and selector `0x6dddf077`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "OracleNotAtQueueIdx",
        abi = "OracleNotAtQueueIdx(address,address,uint256)"
    )]
    pub struct OracleNotAtQueueIdx {
        pub queue_id: ::ethers::core::types::Address,
        pub oracle_id: ::ethers::core::types::Address,
        pub oracle_idx: ::ethers::core::types::U256,
    }
    ///Custom Error type `OracleNotOnQueue` with signature `OracleNotOnQueue(address,address)` and selector `0xcd5d2b06`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "OracleNotOnQueue", abi = "OracleNotOnQueue(address,address)")]
    pub struct OracleNotOnQueue {
        pub queue_id: ::ethers::core::types::Address,
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `OracleQueueDoesNotExist` with signature `OracleQueueDoesNotExist(address)` and selector `0xaf9b8e16`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "OracleQueueDoesNotExist",
        abi = "OracleQueueDoesNotExist(address)"
    )]
    pub struct OracleQueueDoesNotExist {
        pub oracle_queue_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `PermissionDenied` with signature `PermissionDenied(address,address,uint256)` and selector `0xe65cb5d3`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "PermissionDenied",
        abi = "PermissionDenied(address,address,uint256)"
    )]
    pub struct PermissionDenied {
        pub granter: ::ethers::core::types::Address,
        pub grantee: ::ethers::core::types::Address,
        pub permission: ::ethers::core::types::U256,
    }
    ///Custom Error type `QueuesDoNotMatch` with signature `QueuesDoNotMatch(address,address)` and selector `0x2b69267c`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "QueuesDoNotMatch", abi = "QueuesDoNotMatch(address,address)")]
    pub struct QueuesDoNotMatch {
        pub expected_queue_id: ::ethers::core::types::Address,
        pub received_queue_id: ::ethers::core::types::Address,
    }
    ///Custom Error type `SubmittedResultsMismatch` with signature `SubmittedResultsMismatch(uint256,uint256)` and selector `0xc7d91853`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(
        name = "SubmittedResultsMismatch",
        abi = "SubmittedResultsMismatch(uint256,uint256)"
    )]
    pub struct SubmittedResultsMismatch {
        pub aggregators: ::ethers::core::types::U256,
        pub results: ::ethers::core::types::U256,
    }
    ///Custom Error type `TransactionExpired` with signature `TransactionExpired(uint256)` and selector `0x6634e923`
    #[derive(
        Clone,
        ::ethers::contract::EthError,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[etherror(name = "TransactionExpired", abi = "TransactionExpired(uint256)")]
    pub struct TransactionExpired {
        pub expiration_time: ::ethers::core::types::U256,
    }
    ///Container type for all of the contract's custom errors
    #[derive(Clone, ::ethers::contract::EthAbiType, Debug, PartialEq, Eq, Hash)]
    pub enum SwitchboardErrors {
        ACLAdminAlreadyInitialized(ACLAdminAlreadyInitialized),
        ACLNotAdmin(ACLNotAdmin),
        ACLNotAllowed(ACLNotAllowed),
        AggregatorAlreadyExists(AggregatorAlreadyExists),
        AggregatorDoesNotExist(AggregatorDoesNotExist),
        AlreadyExecuted(AlreadyExecuted),
        AttestationQueueAlreadyExists(AttestationQueueAlreadyExists),
        AttestationQueueDoesNotExist(AttestationQueueDoesNotExist),
        ECDSAInvalidSignature(ECDSAInvalidSignature),
        ECDSAInvalidSignatureLength(ECDSAInvalidSignatureLength),
        ECDSAInvalidSignatureS(ECDSAInvalidSignatureS),
        EarlyOracleResponse(EarlyOracleResponse),
        EnclaveAlreadyExists(EnclaveAlreadyExists),
        EnclaveDoesNotExist(EnclaveDoesNotExist),
        EnclaveExpired(EnclaveExpired),
        EnclaveNotAtQueueIdx(EnclaveNotAtQueueIdx),
        EnclaveNotOnQueue(EnclaveNotOnQueue),
        EnclaveNotReadyForVerification(EnclaveNotReadyForVerification),
        EnclaveUnverified(EnclaveUnverified),
        ExcessiveGasSpent(ExcessiveGasSpent),
        ForceOverrideNotReady(ForceOverrideNotReady),
        FunctionAlreadyExists(FunctionAlreadyExists),
        FunctionCallerNotPermitted(FunctionCallerNotPermitted),
        FunctionDoesNotExist(FunctionDoesNotExist),
        FunctionMrEnclaveMismatch(FunctionMrEnclaveMismatch),
        FunctionSignerAlreadySet(FunctionSignerAlreadySet),
        GasLimitExceeded(GasLimitExceeded),
        IncorrectReportedTime(IncorrectReportedTime),
        InitializationFunctionReverted(InitializationFunctionReverted),
        InsufficientBalance(InsufficientBalance),
        InsufficientNodes(InsufficientNodes),
        InsufficientSamples(InsufficientSamples),
        IntervalHistoryNotRecorded(IntervalHistoryNotRecorded),
        InvalidArgument(InvalidArgument),
        InvalidAuthority(InvalidAuthority),
        InvalidEnclave(InvalidEnclave),
        InvalidEntry(InvalidEntry),
        InvalidSignature(InvalidSignature),
        InvalidStatus(InvalidStatus),
        MrEnclaveNotAllowed(MrEnclaveNotAllowed),
        OracleAlreadyExists(OracleAlreadyExists),
        OracleExpired(OracleExpired),
        OracleNotAtQueueIdx(OracleNotAtQueueIdx),
        OracleNotOnQueue(OracleNotOnQueue),
        OracleQueueDoesNotExist(OracleQueueDoesNotExist),
        PermissionDenied(PermissionDenied),
        QueuesDoNotMatch(QueuesDoNotMatch),
        SubmittedResultsMismatch(SubmittedResultsMismatch),
        TransactionExpired(TransactionExpired),
        /// The standard solidity revert string, with selector
        /// Error(string) -- 0x08c379a0
        RevertString(::std::string::String),
    }
    impl ::ethers::core::abi::AbiDecode for SwitchboardErrors {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::core::result::Result<Self, ::ethers::core::abi::AbiError> {
            let data = data.as_ref();
            if let Ok(decoded) =
                <::std::string::String as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::RevertString(decoded));
            }
            if let Ok(decoded) =
                <ACLAdminAlreadyInitialized as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ACLAdminAlreadyInitialized(decoded));
            }
            if let Ok(decoded) = <ACLNotAdmin as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::ACLNotAdmin(decoded));
            }
            if let Ok(decoded) = <ACLNotAllowed as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::ACLNotAllowed(decoded));
            }
            if let Ok(decoded) =
                <AggregatorAlreadyExists as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AggregatorAlreadyExists(decoded));
            }
            if let Ok(decoded) =
                <AggregatorDoesNotExist as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AggregatorDoesNotExist(decoded));
            }
            if let Ok(decoded) = <AlreadyExecuted as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::AlreadyExecuted(decoded));
            }
            if let Ok(decoded) =
                <AttestationQueueAlreadyExists as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AttestationQueueAlreadyExists(decoded));
            }
            if let Ok(decoded) =
                <AttestationQueueDoesNotExist as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AttestationQueueDoesNotExist(decoded));
            }
            if let Ok(decoded) =
                <ECDSAInvalidSignature as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ECDSAInvalidSignature(decoded));
            }
            if let Ok(decoded) =
                <ECDSAInvalidSignatureLength as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ECDSAInvalidSignatureLength(decoded));
            }
            if let Ok(decoded) =
                <ECDSAInvalidSignatureS as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ECDSAInvalidSignatureS(decoded));
            }
            if let Ok(decoded) =
                <EarlyOracleResponse as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EarlyOracleResponse(decoded));
            }
            if let Ok(decoded) =
                <EnclaveAlreadyExists as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveAlreadyExists(decoded));
            }
            if let Ok(decoded) =
                <EnclaveDoesNotExist as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveDoesNotExist(decoded));
            }
            if let Ok(decoded) = <EnclaveExpired as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::EnclaveExpired(decoded));
            }
            if let Ok(decoded) =
                <EnclaveNotAtQueueIdx as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveNotAtQueueIdx(decoded));
            }
            if let Ok(decoded) = <EnclaveNotOnQueue as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveNotOnQueue(decoded));
            }
            if let Ok(decoded) =
                <EnclaveNotReadyForVerification as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveNotReadyForVerification(decoded));
            }
            if let Ok(decoded) = <EnclaveUnverified as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveUnverified(decoded));
            }
            if let Ok(decoded) = <ExcessiveGasSpent as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ExcessiveGasSpent(decoded));
            }
            if let Ok(decoded) =
                <ForceOverrideNotReady as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ForceOverrideNotReady(decoded));
            }
            if let Ok(decoded) =
                <FunctionAlreadyExists as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionAlreadyExists(decoded));
            }
            if let Ok(decoded) =
                <FunctionCallerNotPermitted as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionCallerNotPermitted(decoded));
            }
            if let Ok(decoded) =
                <FunctionDoesNotExist as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionDoesNotExist(decoded));
            }
            if let Ok(decoded) =
                <FunctionMrEnclaveMismatch as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionMrEnclaveMismatch(decoded));
            }
            if let Ok(decoded) =
                <FunctionSignerAlreadySet as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionSignerAlreadySet(decoded));
            }
            if let Ok(decoded) = <GasLimitExceeded as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GasLimitExceeded(decoded));
            }
            if let Ok(decoded) =
                <IncorrectReportedTime as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::IncorrectReportedTime(decoded));
            }
            if let Ok(decoded) =
                <InitializationFunctionReverted as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::InitializationFunctionReverted(decoded));
            }
            if let Ok(decoded) =
                <InsufficientBalance as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::InsufficientBalance(decoded));
            }
            if let Ok(decoded) = <InsufficientNodes as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::InsufficientNodes(decoded));
            }
            if let Ok(decoded) =
                <InsufficientSamples as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::InsufficientSamples(decoded));
            }
            if let Ok(decoded) =
                <IntervalHistoryNotRecorded as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::IntervalHistoryNotRecorded(decoded));
            }
            if let Ok(decoded) = <InvalidArgument as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::InvalidArgument(decoded));
            }
            if let Ok(decoded) = <InvalidAuthority as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::InvalidAuthority(decoded));
            }
            if let Ok(decoded) = <InvalidEnclave as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::InvalidEnclave(decoded));
            }
            if let Ok(decoded) = <InvalidEntry as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::InvalidEntry(decoded));
            }
            if let Ok(decoded) = <InvalidSignature as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::InvalidSignature(decoded));
            }
            if let Ok(decoded) = <InvalidStatus as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::InvalidStatus(decoded));
            }
            if let Ok(decoded) =
                <MrEnclaveNotAllowed as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::MrEnclaveNotAllowed(decoded));
            }
            if let Ok(decoded) =
                <OracleAlreadyExists as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleAlreadyExists(decoded));
            }
            if let Ok(decoded) = <OracleExpired as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::OracleExpired(decoded));
            }
            if let Ok(decoded) =
                <OracleNotAtQueueIdx as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleNotAtQueueIdx(decoded));
            }
            if let Ok(decoded) = <OracleNotOnQueue as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleNotOnQueue(decoded));
            }
            if let Ok(decoded) =
                <OracleQueueDoesNotExist as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleQueueDoesNotExist(decoded));
            }
            if let Ok(decoded) = <PermissionDenied as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::PermissionDenied(decoded));
            }
            if let Ok(decoded) = <QueuesDoNotMatch as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::QueuesDoNotMatch(decoded));
            }
            if let Ok(decoded) =
                <SubmittedResultsMismatch as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SubmittedResultsMismatch(decoded));
            }
            if let Ok(decoded) =
                <TransactionExpired as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::TransactionExpired(decoded));
            }
            Err(::ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ::ethers::core::abi::AbiEncode for SwitchboardErrors {
        fn encode(self) -> ::std::vec::Vec<u8> {
            match self {
                Self::ACLAdminAlreadyInitialized(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::ACLNotAdmin(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::ACLNotAllowed(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::AggregatorAlreadyExists(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AggregatorDoesNotExist(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AlreadyExecuted(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::AttestationQueueAlreadyExists(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AttestationQueueDoesNotExist(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::ECDSAInvalidSignature(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::ECDSAInvalidSignatureLength(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::ECDSAInvalidSignatureS(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EarlyOracleResponse(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveAlreadyExists(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveDoesNotExist(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveExpired(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::EnclaveNotAtQueueIdx(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveNotOnQueue(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::EnclaveNotReadyForVerification(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveUnverified(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::ExcessiveGasSpent(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::ForceOverrideNotReady(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionAlreadyExists(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionCallerNotPermitted(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionDoesNotExist(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionMrEnclaveMismatch(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionSignerAlreadySet(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GasLimitExceeded(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::IncorrectReportedTime(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::InitializationFunctionReverted(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::InsufficientBalance(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::InsufficientNodes(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::InsufficientSamples(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::IntervalHistoryNotRecorded(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::InvalidArgument(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::InvalidAuthority(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::InvalidEnclave(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::InvalidEntry(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::InvalidSignature(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::InvalidStatus(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::MrEnclaveNotAllowed(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::OracleAlreadyExists(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::OracleExpired(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::OracleNotAtQueueIdx(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::OracleNotOnQueue(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::OracleQueueDoesNotExist(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::PermissionDenied(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::QueuesDoNotMatch(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::SubmittedResultsMismatch(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::TransactionExpired(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::RevertString(s) => ::ethers::core::abi::AbiEncode::encode(s),
            }
        }
    }
    impl ::ethers::contract::ContractRevert for SwitchboardErrors {
        fn valid_selector(selector: [u8; 4]) -> bool {
            match selector {
                [0x08, 0xc3, 0x79, 0xa0] => true,
                _ if selector
                    == <ACLAdminAlreadyInitialized as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <ACLNotAdmin as ::ethers::contract::EthError>::selector() => true,
                _ if selector
                    == <ACLNotAllowed as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <AggregatorAlreadyExists as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <AggregatorDoesNotExist as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <AlreadyExecuted as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <AttestationQueueAlreadyExists as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <AttestationQueueDoesNotExist as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <ECDSAInvalidSignature as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <ECDSAInvalidSignatureLength as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <ECDSAInvalidSignatureS as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EarlyOracleResponse as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveAlreadyExists as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveDoesNotExist as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveExpired as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveNotAtQueueIdx as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveNotOnQueue as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveNotReadyForVerification as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <EnclaveUnverified as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <ExcessiveGasSpent as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <ForceOverrideNotReady as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <FunctionAlreadyExists as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <FunctionCallerNotPermitted as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <FunctionDoesNotExist as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <FunctionMrEnclaveMismatch as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <FunctionSignerAlreadySet as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <GasLimitExceeded as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <IncorrectReportedTime as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InitializationFunctionReverted as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InsufficientBalance as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InsufficientNodes as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InsufficientSamples as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <IntervalHistoryNotRecorded as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InvalidArgument as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InvalidAuthority as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InvalidEnclave as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InvalidEntry as ::ethers::contract::EthError>::selector() => true,
                _ if selector
                    == <InvalidSignature as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <InvalidStatus as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <MrEnclaveNotAllowed as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <OracleAlreadyExists as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <OracleExpired as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <OracleNotAtQueueIdx as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <OracleNotOnQueue as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <OracleQueueDoesNotExist as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <PermissionDenied as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <QueuesDoNotMatch as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <SubmittedResultsMismatch as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ if selector
                    == <TransactionExpired as ::ethers::contract::EthError>::selector() => {
                    true
                }
                _ => false,
            }
        }
    }
    impl ::core::fmt::Display for SwitchboardErrors {
        fn fmt(&self, f: &mut ::core::fmt::Formatter<'_>) -> ::core::fmt::Result {
            match self {
                Self::ACLAdminAlreadyInitialized(element) => ::core::fmt::Display::fmt(element, f),
                Self::ACLNotAdmin(element) => ::core::fmt::Display::fmt(element, f),
                Self::ACLNotAllowed(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorAlreadyExists(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorDoesNotExist(element) => ::core::fmt::Display::fmt(element, f),
                Self::AlreadyExecuted(element) => ::core::fmt::Display::fmt(element, f),
                Self::AttestationQueueAlreadyExists(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AttestationQueueDoesNotExist(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::ECDSAInvalidSignature(element) => ::core::fmt::Display::fmt(element, f),
                Self::ECDSAInvalidSignatureLength(element) => ::core::fmt::Display::fmt(element, f),
                Self::ECDSAInvalidSignatureS(element) => ::core::fmt::Display::fmt(element, f),
                Self::EarlyOracleResponse(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveAlreadyExists(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveDoesNotExist(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveExpired(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveNotAtQueueIdx(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveNotOnQueue(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveNotReadyForVerification(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::EnclaveUnverified(element) => ::core::fmt::Display::fmt(element, f),
                Self::ExcessiveGasSpent(element) => ::core::fmt::Display::fmt(element, f),
                Self::ForceOverrideNotReady(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionAlreadyExists(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionCallerNotPermitted(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionDoesNotExist(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionMrEnclaveMismatch(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionSignerAlreadySet(element) => ::core::fmt::Display::fmt(element, f),
                Self::GasLimitExceeded(element) => ::core::fmt::Display::fmt(element, f),
                Self::IncorrectReportedTime(element) => ::core::fmt::Display::fmt(element, f),
                Self::InitializationFunctionReverted(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::InsufficientBalance(element) => ::core::fmt::Display::fmt(element, f),
                Self::InsufficientNodes(element) => ::core::fmt::Display::fmt(element, f),
                Self::InsufficientSamples(element) => ::core::fmt::Display::fmt(element, f),
                Self::IntervalHistoryNotRecorded(element) => ::core::fmt::Display::fmt(element, f),
                Self::InvalidArgument(element) => ::core::fmt::Display::fmt(element, f),
                Self::InvalidAuthority(element) => ::core::fmt::Display::fmt(element, f),
                Self::InvalidEnclave(element) => ::core::fmt::Display::fmt(element, f),
                Self::InvalidEntry(element) => ::core::fmt::Display::fmt(element, f),
                Self::InvalidSignature(element) => ::core::fmt::Display::fmt(element, f),
                Self::InvalidStatus(element) => ::core::fmt::Display::fmt(element, f),
                Self::MrEnclaveNotAllowed(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleAlreadyExists(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleExpired(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleNotAtQueueIdx(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleNotOnQueue(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleQueueDoesNotExist(element) => ::core::fmt::Display::fmt(element, f),
                Self::PermissionDenied(element) => ::core::fmt::Display::fmt(element, f),
                Self::QueuesDoNotMatch(element) => ::core::fmt::Display::fmt(element, f),
                Self::SubmittedResultsMismatch(element) => ::core::fmt::Display::fmt(element, f),
                Self::TransactionExpired(element) => ::core::fmt::Display::fmt(element, f),
                Self::RevertString(s) => ::core::fmt::Display::fmt(s, f),
            }
        }
    }
    impl ::core::convert::From<::std::string::String> for SwitchboardErrors {
        fn from(value: String) -> Self {
            Self::RevertString(value)
        }
    }
    impl ::core::convert::From<ACLAdminAlreadyInitialized> for SwitchboardErrors {
        fn from(value: ACLAdminAlreadyInitialized) -> Self {
            Self::ACLAdminAlreadyInitialized(value)
        }
    }
    impl ::core::convert::From<ACLNotAdmin> for SwitchboardErrors {
        fn from(value: ACLNotAdmin) -> Self {
            Self::ACLNotAdmin(value)
        }
    }
    impl ::core::convert::From<ACLNotAllowed> for SwitchboardErrors {
        fn from(value: ACLNotAllowed) -> Self {
            Self::ACLNotAllowed(value)
        }
    }
    impl ::core::convert::From<AggregatorAlreadyExists> for SwitchboardErrors {
        fn from(value: AggregatorAlreadyExists) -> Self {
            Self::AggregatorAlreadyExists(value)
        }
    }
    impl ::core::convert::From<AggregatorDoesNotExist> for SwitchboardErrors {
        fn from(value: AggregatorDoesNotExist) -> Self {
            Self::AggregatorDoesNotExist(value)
        }
    }
    impl ::core::convert::From<AlreadyExecuted> for SwitchboardErrors {
        fn from(value: AlreadyExecuted) -> Self {
            Self::AlreadyExecuted(value)
        }
    }
    impl ::core::convert::From<AttestationQueueAlreadyExists> for SwitchboardErrors {
        fn from(value: AttestationQueueAlreadyExists) -> Self {
            Self::AttestationQueueAlreadyExists(value)
        }
    }
    impl ::core::convert::From<AttestationQueueDoesNotExist> for SwitchboardErrors {
        fn from(value: AttestationQueueDoesNotExist) -> Self {
            Self::AttestationQueueDoesNotExist(value)
        }
    }
    impl ::core::convert::From<ECDSAInvalidSignature> for SwitchboardErrors {
        fn from(value: ECDSAInvalidSignature) -> Self {
            Self::ECDSAInvalidSignature(value)
        }
    }
    impl ::core::convert::From<ECDSAInvalidSignatureLength> for SwitchboardErrors {
        fn from(value: ECDSAInvalidSignatureLength) -> Self {
            Self::ECDSAInvalidSignatureLength(value)
        }
    }
    impl ::core::convert::From<ECDSAInvalidSignatureS> for SwitchboardErrors {
        fn from(value: ECDSAInvalidSignatureS) -> Self {
            Self::ECDSAInvalidSignatureS(value)
        }
    }
    impl ::core::convert::From<EarlyOracleResponse> for SwitchboardErrors {
        fn from(value: EarlyOracleResponse) -> Self {
            Self::EarlyOracleResponse(value)
        }
    }
    impl ::core::convert::From<EnclaveAlreadyExists> for SwitchboardErrors {
        fn from(value: EnclaveAlreadyExists) -> Self {
            Self::EnclaveAlreadyExists(value)
        }
    }
    impl ::core::convert::From<EnclaveDoesNotExist> for SwitchboardErrors {
        fn from(value: EnclaveDoesNotExist) -> Self {
            Self::EnclaveDoesNotExist(value)
        }
    }
    impl ::core::convert::From<EnclaveExpired> for SwitchboardErrors {
        fn from(value: EnclaveExpired) -> Self {
            Self::EnclaveExpired(value)
        }
    }
    impl ::core::convert::From<EnclaveNotAtQueueIdx> for SwitchboardErrors {
        fn from(value: EnclaveNotAtQueueIdx) -> Self {
            Self::EnclaveNotAtQueueIdx(value)
        }
    }
    impl ::core::convert::From<EnclaveNotOnQueue> for SwitchboardErrors {
        fn from(value: EnclaveNotOnQueue) -> Self {
            Self::EnclaveNotOnQueue(value)
        }
    }
    impl ::core::convert::From<EnclaveNotReadyForVerification> for SwitchboardErrors {
        fn from(value: EnclaveNotReadyForVerification) -> Self {
            Self::EnclaveNotReadyForVerification(value)
        }
    }
    impl ::core::convert::From<EnclaveUnverified> for SwitchboardErrors {
        fn from(value: EnclaveUnverified) -> Self {
            Self::EnclaveUnverified(value)
        }
    }
    impl ::core::convert::From<ExcessiveGasSpent> for SwitchboardErrors {
        fn from(value: ExcessiveGasSpent) -> Self {
            Self::ExcessiveGasSpent(value)
        }
    }
    impl ::core::convert::From<ForceOverrideNotReady> for SwitchboardErrors {
        fn from(value: ForceOverrideNotReady) -> Self {
            Self::ForceOverrideNotReady(value)
        }
    }
    impl ::core::convert::From<FunctionAlreadyExists> for SwitchboardErrors {
        fn from(value: FunctionAlreadyExists) -> Self {
            Self::FunctionAlreadyExists(value)
        }
    }
    impl ::core::convert::From<FunctionCallerNotPermitted> for SwitchboardErrors {
        fn from(value: FunctionCallerNotPermitted) -> Self {
            Self::FunctionCallerNotPermitted(value)
        }
    }
    impl ::core::convert::From<FunctionDoesNotExist> for SwitchboardErrors {
        fn from(value: FunctionDoesNotExist) -> Self {
            Self::FunctionDoesNotExist(value)
        }
    }
    impl ::core::convert::From<FunctionMrEnclaveMismatch> for SwitchboardErrors {
        fn from(value: FunctionMrEnclaveMismatch) -> Self {
            Self::FunctionMrEnclaveMismatch(value)
        }
    }
    impl ::core::convert::From<FunctionSignerAlreadySet> for SwitchboardErrors {
        fn from(value: FunctionSignerAlreadySet) -> Self {
            Self::FunctionSignerAlreadySet(value)
        }
    }
    impl ::core::convert::From<GasLimitExceeded> for SwitchboardErrors {
        fn from(value: GasLimitExceeded) -> Self {
            Self::GasLimitExceeded(value)
        }
    }
    impl ::core::convert::From<IncorrectReportedTime> for SwitchboardErrors {
        fn from(value: IncorrectReportedTime) -> Self {
            Self::IncorrectReportedTime(value)
        }
    }
    impl ::core::convert::From<InitializationFunctionReverted> for SwitchboardErrors {
        fn from(value: InitializationFunctionReverted) -> Self {
            Self::InitializationFunctionReverted(value)
        }
    }
    impl ::core::convert::From<InsufficientBalance> for SwitchboardErrors {
        fn from(value: InsufficientBalance) -> Self {
            Self::InsufficientBalance(value)
        }
    }
    impl ::core::convert::From<InsufficientNodes> for SwitchboardErrors {
        fn from(value: InsufficientNodes) -> Self {
            Self::InsufficientNodes(value)
        }
    }
    impl ::core::convert::From<InsufficientSamples> for SwitchboardErrors {
        fn from(value: InsufficientSamples) -> Self {
            Self::InsufficientSamples(value)
        }
    }
    impl ::core::convert::From<IntervalHistoryNotRecorded> for SwitchboardErrors {
        fn from(value: IntervalHistoryNotRecorded) -> Self {
            Self::IntervalHistoryNotRecorded(value)
        }
    }
    impl ::core::convert::From<InvalidArgument> for SwitchboardErrors {
        fn from(value: InvalidArgument) -> Self {
            Self::InvalidArgument(value)
        }
    }
    impl ::core::convert::From<InvalidAuthority> for SwitchboardErrors {
        fn from(value: InvalidAuthority) -> Self {
            Self::InvalidAuthority(value)
        }
    }
    impl ::core::convert::From<InvalidEnclave> for SwitchboardErrors {
        fn from(value: InvalidEnclave) -> Self {
            Self::InvalidEnclave(value)
        }
    }
    impl ::core::convert::From<InvalidEntry> for SwitchboardErrors {
        fn from(value: InvalidEntry) -> Self {
            Self::InvalidEntry(value)
        }
    }
    impl ::core::convert::From<InvalidSignature> for SwitchboardErrors {
        fn from(value: InvalidSignature) -> Self {
            Self::InvalidSignature(value)
        }
    }
    impl ::core::convert::From<InvalidStatus> for SwitchboardErrors {
        fn from(value: InvalidStatus) -> Self {
            Self::InvalidStatus(value)
        }
    }
    impl ::core::convert::From<MrEnclaveNotAllowed> for SwitchboardErrors {
        fn from(value: MrEnclaveNotAllowed) -> Self {
            Self::MrEnclaveNotAllowed(value)
        }
    }
    impl ::core::convert::From<OracleAlreadyExists> for SwitchboardErrors {
        fn from(value: OracleAlreadyExists) -> Self {
            Self::OracleAlreadyExists(value)
        }
    }
    impl ::core::convert::From<OracleExpired> for SwitchboardErrors {
        fn from(value: OracleExpired) -> Self {
            Self::OracleExpired(value)
        }
    }
    impl ::core::convert::From<OracleNotAtQueueIdx> for SwitchboardErrors {
        fn from(value: OracleNotAtQueueIdx) -> Self {
            Self::OracleNotAtQueueIdx(value)
        }
    }
    impl ::core::convert::From<OracleNotOnQueue> for SwitchboardErrors {
        fn from(value: OracleNotOnQueue) -> Self {
            Self::OracleNotOnQueue(value)
        }
    }
    impl ::core::convert::From<OracleQueueDoesNotExist> for SwitchboardErrors {
        fn from(value: OracleQueueDoesNotExist) -> Self {
            Self::OracleQueueDoesNotExist(value)
        }
    }
    impl ::core::convert::From<PermissionDenied> for SwitchboardErrors {
        fn from(value: PermissionDenied) -> Self {
            Self::PermissionDenied(value)
        }
    }
    impl ::core::convert::From<QueuesDoNotMatch> for SwitchboardErrors {
        fn from(value: QueuesDoNotMatch) -> Self {
            Self::QueuesDoNotMatch(value)
        }
    }
    impl ::core::convert::From<SubmittedResultsMismatch> for SwitchboardErrors {
        fn from(value: SubmittedResultsMismatch) -> Self {
            Self::SubmittedResultsMismatch(value)
        }
    }
    impl ::core::convert::From<TransactionExpired> for SwitchboardErrors {
        fn from(value: TransactionExpired) -> Self {
            Self::TransactionExpired(value)
        }
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "AddMrEnclave", abi = "AddMrEnclave(address,bytes32)")]
    pub struct AddMrEnclaveFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorAccountInit",
        abi = "AggregatorAccountInit(address,address,uint256)"
    )]
    pub struct AggregatorAccountInitFilter {
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub account_id: ::ethers::core::types::Address,
        pub timestamp: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorFundEvent",
        abi = "AggregatorFundEvent(address,address,uint256)"
    )]
    pub struct AggregatorFundEventFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub funder: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorIntervalRefreshed",
        abi = "AggregatorIntervalRefreshed(address,uint256,uint256)"
    )]
    pub struct AggregatorIntervalRefreshedFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub interval_id: ::ethers::core::types::U256,
        #[ethevent(indexed)]
        pub balance_left_for_interval: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorOpenInterval",
        abi = "AggregatorOpenInterval(address,uint256)"
    )]
    pub struct AggregatorOpenIntervalFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub interval_id: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorRead",
        abi = "AggregatorRead(address,address,int256)"
    )]
    pub struct AggregatorReadFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub reader: ::ethers::core::types::Address,
        pub value: ::ethers::core::types::I256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorSaveResult",
        abi = "AggregatorSaveResult(address,address,int256)"
    )]
    pub struct AggregatorSaveResultFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub oracle: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub value: ::ethers::core::types::I256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorSettingsUpdated",
        abi = "AggregatorSettingsUpdated(address,uint256,uint256,uint256,uint256,uint256)"
    )]
    pub struct AggregatorSettingsUpdatedFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        pub min_update_delay_seconds: ::ethers::core::types::U256,
        pub min_oracle_results: ::ethers::core::types::U256,
        pub variance_threshold: ::ethers::core::types::U256,
        pub min_job_results: ::ethers::core::types::U256,
        pub force_report_period: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorUpdate",
        abi = "AggregatorUpdate(address,int256,uint256)"
    )]
    pub struct AggregatorUpdateFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub value: ::ethers::core::types::I256,
        pub timestamp: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AggregatorWithdrawEvent",
        abi = "AggregatorWithdrawEvent(address,address,uint256)"
    )]
    pub struct AggregatorWithdrawEventFilter {
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub funder: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AttestationQueueAccountInit",
        abi = "AttestationQueueAccountInit(address,address)"
    )]
    pub struct AttestationQueueAccountInitFilter {
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub account_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AttestationQueuePermissionUpdated",
        abi = "AttestationQueuePermissionUpdated(address,address,address,uint256)"
    )]
    pub struct AttestationQueuePermissionUpdatedFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub granter: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub grantee: ::ethers::core::types::Address,
        pub permission: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "AttestationQueueSetConfig",
        abi = "AttestationQueueSetConfig(address,address)"
    )]
    pub struct AttestationQueueSetConfigFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "DiamondCut",
        abi = "DiamondCut((address,uint8,bytes4[])[],address,bytes)"
    )]
    pub struct DiamondCutFilter {
        pub diamond_cut: ::std::vec::Vec<FacetCut>,
        pub init: ::ethers::core::types::Address,
        pub calldata: ::ethers::core::types::Bytes,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "EnclaveAccountInit",
        abi = "EnclaveAccountInit(address,address)"
    )]
    pub struct EnclaveAccountInitFilter {
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub account_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "EnclaveGC", abi = "EnclaveGC(address,address)")]
    pub struct EnclaveGCFilter {
        #[ethevent(indexed)]
        pub enclave_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub queue: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "EnclaveHeartbeat", abi = "EnclaveHeartbeat(address,address)")]
    pub struct EnclaveHeartbeatFilter {
        #[ethevent(indexed)]
        pub enclave_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "EnclavePayoutEvent",
        abi = "EnclavePayoutEvent(address,address,uint256)"
    )]
    pub struct EnclavePayoutEventFilter {
        #[ethevent(indexed)]
        pub node_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub enclave_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "EnclaveRotateAuthority",
        abi = "EnclaveRotateAuthority(address,address,address)"
    )]
    pub struct EnclaveRotateAuthorityFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub old_authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub new_authority: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "EnclaveVerifyRequest",
        abi = "EnclaveVerifyRequest(address,address,address)"
    )]
    pub struct EnclaveVerifyRequestFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub verifier: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub verifiee: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "FunctionAccountInit",
        abi = "FunctionAccountInit(address,address)"
    )]
    pub struct FunctionAccountInitFilter {
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub account_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "FunctionCallEvent",
        abi = "FunctionCallEvent(address,address,uint256,bytes)"
    )]
    pub struct FunctionCallEventFilter {
        #[ethevent(indexed)]
        pub function_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub sender: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub call_id: ::ethers::core::types::U256,
        pub params: ::ethers::core::types::Bytes,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "FunctionCallFailure",
        abi = "FunctionCallFailure(address,address,uint256,bytes)"
    )]
    pub struct FunctionCallFailureFilter {
        #[ethevent(indexed)]
        pub function_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub sender: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub call_id: ::ethers::core::types::U256,
        pub params: ::ethers::core::types::Bytes,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "FunctionCallFund",
        abi = "FunctionCallFund(address,address,uint256)"
    )]
    pub struct FunctionCallFundFilter {
        #[ethevent(indexed)]
        pub function_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub funder: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "FunctionFund", abi = "FunctionFund(address,address,uint256)")]
    pub struct FunctionFundFilter {
        #[ethevent(indexed)]
        pub function_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub funder: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "FunctionWithdraw",
        abi = "FunctionWithdraw(address,address,uint256)"
    )]
    pub struct FunctionWithdrawFilter {
        #[ethevent(indexed)]
        pub function_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub withdrawer: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "NewRandomValue", abi = "NewRandomValue(uint256)")]
    pub struct NewRandomValueFilter {
        pub value: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "OracleAccountInit", abi = "OracleAccountInit(address,address)")]
    pub struct OracleAccountInitFilter {
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub account_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "OracleGC", abi = "OracleGC(address,address)")]
    pub struct OracleGCFilter {
        #[ethevent(indexed)]
        pub oracle_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "OracleHeartbeat", abi = "OracleHeartbeat(address)")]
    pub struct OracleHeartbeatFilter {
        #[ethevent(indexed)]
        pub oracle_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OraclePayoutEvent",
        abi = "OraclePayoutEvent(address,address,uint256)"
    )]
    pub struct OraclePayoutEventFilter {
        #[ethevent(indexed)]
        pub oracle_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub aggregator_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub amount: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleQueueAccountInit",
        abi = "OracleQueueAccountInit(address,address)"
    )]
    pub struct OracleQueueAccountInitFilter {
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub account_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleQueueAddMrEnclave",
        abi = "OracleQueueAddMrEnclave(address,address,bytes32)"
    )]
    pub struct OracleQueueAddMrEnclaveFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub attestation_queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleQueueRemoveMrEnclave",
        abi = "OracleQueueRemoveMrEnclave(address,address,bytes32)"
    )]
    pub struct OracleQueueRemoveMrEnclaveFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub attestation_queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleQueueSetAttestationConfig",
        abi = "OracleQueueSetAttestationConfig(address,address)"
    )]
    pub struct OracleQueueSetAttestationConfigFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub attestation_queue_id: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleQueueSetConfig",
        abi = "OracleQueueSetConfig(address,address)"
    )]
    pub struct OracleQueueSetConfigFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleQueueSetPermission",
        abi = "OracleQueueSetPermission(address,address,address,uint256)"
    )]
    pub struct OracleQueueSetPermissionFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub granter: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub grantee: ::ethers::core::types::Address,
        pub permission: ::ethers::core::types::U256,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OracleSetConfig",
        abi = "OracleSetConfig(address,string,address,address,address)"
    )]
    pub struct OracleSetConfigFilter {
        #[ethevent(indexed)]
        pub oracle_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        #[ethevent(indexed)]
        pub authority: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(
        name = "OwnershipTransferred",
        abi = "OwnershipTransferred(address,address)"
    )]
    pub struct OwnershipTransferredFilter {
        #[ethevent(indexed)]
        pub previous_owner: ::ethers::core::types::Address,
        #[ethevent(indexed)]
        pub new_owner: ::ethers::core::types::Address,
    }
    #[derive(
        Clone,
        ::ethers::contract::EthEvent,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethevent(name = "RemoveMrEnclave", abi = "RemoveMrEnclave(address,bytes32)")]
    pub struct RemoveMrEnclaveFilter {
        #[ethevent(indexed)]
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all of the contract's events
    #[derive(Clone, ::ethers::contract::EthAbiType, Debug, PartialEq, Eq, Hash)]
    pub enum SwitchboardEvents {
        AddMrEnclaveFilter(AddMrEnclaveFilter),
        AggregatorAccountInitFilter(AggregatorAccountInitFilter),
        AggregatorFundEventFilter(AggregatorFundEventFilter),
        AggregatorIntervalRefreshedFilter(AggregatorIntervalRefreshedFilter),
        AggregatorOpenIntervalFilter(AggregatorOpenIntervalFilter),
        AggregatorReadFilter(AggregatorReadFilter),
        AggregatorSaveResultFilter(AggregatorSaveResultFilter),
        AggregatorSettingsUpdatedFilter(AggregatorSettingsUpdatedFilter),
        AggregatorUpdateFilter(AggregatorUpdateFilter),
        AggregatorWithdrawEventFilter(AggregatorWithdrawEventFilter),
        AttestationQueueAccountInitFilter(AttestationQueueAccountInitFilter),
        AttestationQueuePermissionUpdatedFilter(AttestationQueuePermissionUpdatedFilter),
        AttestationQueueSetConfigFilter(AttestationQueueSetConfigFilter),
        DiamondCutFilter(DiamondCutFilter),
        EnclaveAccountInitFilter(EnclaveAccountInitFilter),
        EnclaveGCFilter(EnclaveGCFilter),
        EnclaveHeartbeatFilter(EnclaveHeartbeatFilter),
        EnclavePayoutEventFilter(EnclavePayoutEventFilter),
        EnclaveRotateAuthorityFilter(EnclaveRotateAuthorityFilter),
        EnclaveVerifyRequestFilter(EnclaveVerifyRequestFilter),
        FunctionAccountInitFilter(FunctionAccountInitFilter),
        FunctionCallEventFilter(FunctionCallEventFilter),
        FunctionCallFailureFilter(FunctionCallFailureFilter),
        FunctionCallFundFilter(FunctionCallFundFilter),
        FunctionFundFilter(FunctionFundFilter),
        FunctionWithdrawFilter(FunctionWithdrawFilter),
        NewRandomValueFilter(NewRandomValueFilter),
        OracleAccountInitFilter(OracleAccountInitFilter),
        OracleGCFilter(OracleGCFilter),
        OracleHeartbeatFilter(OracleHeartbeatFilter),
        OraclePayoutEventFilter(OraclePayoutEventFilter),
        OracleQueueAccountInitFilter(OracleQueueAccountInitFilter),
        OracleQueueAddMrEnclaveFilter(OracleQueueAddMrEnclaveFilter),
        OracleQueueRemoveMrEnclaveFilter(OracleQueueRemoveMrEnclaveFilter),
        OracleQueueSetAttestationConfigFilter(OracleQueueSetAttestationConfigFilter),
        OracleQueueSetConfigFilter(OracleQueueSetConfigFilter),
        OracleQueueSetPermissionFilter(OracleQueueSetPermissionFilter),
        OracleSetConfigFilter(OracleSetConfigFilter),
        OwnershipTransferredFilter(OwnershipTransferredFilter),
        RemoveMrEnclaveFilter(RemoveMrEnclaveFilter),
    }
    impl ::ethers::contract::EthLogDecode for SwitchboardEvents {
        fn decode_log(
            log: &::ethers::core::abi::RawLog,
        ) -> ::core::result::Result<Self, ::ethers::core::abi::Error> {
            if let Ok(decoded) = AddMrEnclaveFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AddMrEnclaveFilter(decoded));
            }
            if let Ok(decoded) = AggregatorAccountInitFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorAccountInitFilter(decoded));
            }
            if let Ok(decoded) = AggregatorFundEventFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorFundEventFilter(decoded));
            }
            if let Ok(decoded) = AggregatorIntervalRefreshedFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorIntervalRefreshedFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = AggregatorOpenIntervalFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorOpenIntervalFilter(decoded));
            }
            if let Ok(decoded) = AggregatorReadFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorReadFilter(decoded));
            }
            if let Ok(decoded) = AggregatorSaveResultFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorSaveResultFilter(decoded));
            }
            if let Ok(decoded) = AggregatorSettingsUpdatedFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorSettingsUpdatedFilter(decoded));
            }
            if let Ok(decoded) = AggregatorUpdateFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorUpdateFilter(decoded));
            }
            if let Ok(decoded) = AggregatorWithdrawEventFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AggregatorWithdrawEventFilter(decoded));
            }
            if let Ok(decoded) = AttestationQueueAccountInitFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AttestationQueueAccountInitFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = AttestationQueuePermissionUpdatedFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AttestationQueuePermissionUpdatedFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = AttestationQueueSetConfigFilter::decode_log(log) {
                return Ok(SwitchboardEvents::AttestationQueueSetConfigFilter(decoded));
            }
            if let Ok(decoded) = DiamondCutFilter::decode_log(log) {
                return Ok(SwitchboardEvents::DiamondCutFilter(decoded));
            }
            if let Ok(decoded) = EnclaveAccountInitFilter::decode_log(log) {
                return Ok(SwitchboardEvents::EnclaveAccountInitFilter(decoded));
            }
            if let Ok(decoded) = EnclaveGCFilter::decode_log(log) {
                return Ok(SwitchboardEvents::EnclaveGCFilter(decoded));
            }
            if let Ok(decoded) = EnclaveHeartbeatFilter::decode_log(log) {
                return Ok(SwitchboardEvents::EnclaveHeartbeatFilter(decoded));
            }
            if let Ok(decoded) = EnclavePayoutEventFilter::decode_log(log) {
                return Ok(SwitchboardEvents::EnclavePayoutEventFilter(decoded));
            }
            if let Ok(decoded) = EnclaveRotateAuthorityFilter::decode_log(log) {
                return Ok(SwitchboardEvents::EnclaveRotateAuthorityFilter(decoded));
            }
            if let Ok(decoded) = EnclaveVerifyRequestFilter::decode_log(log) {
                return Ok(SwitchboardEvents::EnclaveVerifyRequestFilter(decoded));
            }
            if let Ok(decoded) = FunctionAccountInitFilter::decode_log(log) {
                return Ok(SwitchboardEvents::FunctionAccountInitFilter(decoded));
            }
            if let Ok(decoded) = FunctionCallEventFilter::decode_log(log) {
                return Ok(SwitchboardEvents::FunctionCallEventFilter(decoded));
            }
            if let Ok(decoded) = FunctionCallFailureFilter::decode_log(log) {
                return Ok(SwitchboardEvents::FunctionCallFailureFilter(decoded));
            }
            if let Ok(decoded) = FunctionCallFundFilter::decode_log(log) {
                return Ok(SwitchboardEvents::FunctionCallFundFilter(decoded));
            }
            if let Ok(decoded) = FunctionFundFilter::decode_log(log) {
                return Ok(SwitchboardEvents::FunctionFundFilter(decoded));
            }
            if let Ok(decoded) = FunctionWithdrawFilter::decode_log(log) {
                return Ok(SwitchboardEvents::FunctionWithdrawFilter(decoded));
            }
            if let Ok(decoded) = NewRandomValueFilter::decode_log(log) {
                return Ok(SwitchboardEvents::NewRandomValueFilter(decoded));
            }
            if let Ok(decoded) = OracleAccountInitFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleAccountInitFilter(decoded));
            }
            if let Ok(decoded) = OracleGCFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleGCFilter(decoded));
            }
            if let Ok(decoded) = OracleHeartbeatFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleHeartbeatFilter(decoded));
            }
            if let Ok(decoded) = OraclePayoutEventFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OraclePayoutEventFilter(decoded));
            }
            if let Ok(decoded) = OracleQueueAccountInitFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleQueueAccountInitFilter(decoded));
            }
            if let Ok(decoded) = OracleQueueAddMrEnclaveFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleQueueAddMrEnclaveFilter(decoded));
            }
            if let Ok(decoded) = OracleQueueRemoveMrEnclaveFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleQueueRemoveMrEnclaveFilter(decoded));
            }
            if let Ok(decoded) = OracleQueueSetAttestationConfigFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleQueueSetAttestationConfigFilter(
                    decoded,
                ));
            }
            if let Ok(decoded) = OracleQueueSetConfigFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleQueueSetConfigFilter(decoded));
            }
            if let Ok(decoded) = OracleQueueSetPermissionFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleQueueSetPermissionFilter(decoded));
            }
            if let Ok(decoded) = OracleSetConfigFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OracleSetConfigFilter(decoded));
            }
            if let Ok(decoded) = OwnershipTransferredFilter::decode_log(log) {
                return Ok(SwitchboardEvents::OwnershipTransferredFilter(decoded));
            }
            if let Ok(decoded) = RemoveMrEnclaveFilter::decode_log(log) {
                return Ok(SwitchboardEvents::RemoveMrEnclaveFilter(decoded));
            }
            Err(::ethers::core::abi::Error::InvalidData)
        }
    }
    impl ::core::fmt::Display for SwitchboardEvents {
        fn fmt(&self, f: &mut ::core::fmt::Formatter<'_>) -> ::core::fmt::Result {
            match self {
                Self::AddMrEnclaveFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorAccountInitFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorFundEventFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorIntervalRefreshedFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AggregatorOpenIntervalFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AggregatorReadFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorSaveResultFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorSettingsUpdatedFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AggregatorUpdateFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorWithdrawEventFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AttestationQueueAccountInitFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AttestationQueuePermissionUpdatedFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AttestationQueueSetConfigFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::DiamondCutFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveAccountInitFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveGCFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveHeartbeatFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclavePayoutEventFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveRotateAuthorityFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::EnclaveVerifyRequestFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionAccountInitFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionCallEventFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionCallFailureFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionCallFundFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionFundFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionWithdrawFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::NewRandomValueFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleAccountInitFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleGCFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleHeartbeatFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OraclePayoutEventFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleQueueAccountInitFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::OracleQueueAddMrEnclaveFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::OracleQueueRemoveMrEnclaveFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::OracleQueueSetAttestationConfigFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::OracleQueueSetConfigFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleQueueSetPermissionFilter(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::OracleSetConfigFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::OwnershipTransferredFilter(element) => ::core::fmt::Display::fmt(element, f),
                Self::RemoveMrEnclaveFilter(element) => ::core::fmt::Display::fmt(element, f),
            }
        }
    }
    impl ::core::convert::From<AddMrEnclaveFilter> for SwitchboardEvents {
        fn from(value: AddMrEnclaveFilter) -> Self {
            Self::AddMrEnclaveFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorAccountInitFilter> for SwitchboardEvents {
        fn from(value: AggregatorAccountInitFilter) -> Self {
            Self::AggregatorAccountInitFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorFundEventFilter> for SwitchboardEvents {
        fn from(value: AggregatorFundEventFilter) -> Self {
            Self::AggregatorFundEventFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorIntervalRefreshedFilter> for SwitchboardEvents {
        fn from(value: AggregatorIntervalRefreshedFilter) -> Self {
            Self::AggregatorIntervalRefreshedFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorOpenIntervalFilter> for SwitchboardEvents {
        fn from(value: AggregatorOpenIntervalFilter) -> Self {
            Self::AggregatorOpenIntervalFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorReadFilter> for SwitchboardEvents {
        fn from(value: AggregatorReadFilter) -> Self {
            Self::AggregatorReadFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorSaveResultFilter> for SwitchboardEvents {
        fn from(value: AggregatorSaveResultFilter) -> Self {
            Self::AggregatorSaveResultFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorSettingsUpdatedFilter> for SwitchboardEvents {
        fn from(value: AggregatorSettingsUpdatedFilter) -> Self {
            Self::AggregatorSettingsUpdatedFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorUpdateFilter> for SwitchboardEvents {
        fn from(value: AggregatorUpdateFilter) -> Self {
            Self::AggregatorUpdateFilter(value)
        }
    }
    impl ::core::convert::From<AggregatorWithdrawEventFilter> for SwitchboardEvents {
        fn from(value: AggregatorWithdrawEventFilter) -> Self {
            Self::AggregatorWithdrawEventFilter(value)
        }
    }
    impl ::core::convert::From<AttestationQueueAccountInitFilter> for SwitchboardEvents {
        fn from(value: AttestationQueueAccountInitFilter) -> Self {
            Self::AttestationQueueAccountInitFilter(value)
        }
    }
    impl ::core::convert::From<AttestationQueuePermissionUpdatedFilter> for SwitchboardEvents {
        fn from(value: AttestationQueuePermissionUpdatedFilter) -> Self {
            Self::AttestationQueuePermissionUpdatedFilter(value)
        }
    }
    impl ::core::convert::From<AttestationQueueSetConfigFilter> for SwitchboardEvents {
        fn from(value: AttestationQueueSetConfigFilter) -> Self {
            Self::AttestationQueueSetConfigFilter(value)
        }
    }
    impl ::core::convert::From<DiamondCutFilter> for SwitchboardEvents {
        fn from(value: DiamondCutFilter) -> Self {
            Self::DiamondCutFilter(value)
        }
    }
    impl ::core::convert::From<EnclaveAccountInitFilter> for SwitchboardEvents {
        fn from(value: EnclaveAccountInitFilter) -> Self {
            Self::EnclaveAccountInitFilter(value)
        }
    }
    impl ::core::convert::From<EnclaveGCFilter> for SwitchboardEvents {
        fn from(value: EnclaveGCFilter) -> Self {
            Self::EnclaveGCFilter(value)
        }
    }
    impl ::core::convert::From<EnclaveHeartbeatFilter> for SwitchboardEvents {
        fn from(value: EnclaveHeartbeatFilter) -> Self {
            Self::EnclaveHeartbeatFilter(value)
        }
    }
    impl ::core::convert::From<EnclavePayoutEventFilter> for SwitchboardEvents {
        fn from(value: EnclavePayoutEventFilter) -> Self {
            Self::EnclavePayoutEventFilter(value)
        }
    }
    impl ::core::convert::From<EnclaveRotateAuthorityFilter> for SwitchboardEvents {
        fn from(value: EnclaveRotateAuthorityFilter) -> Self {
            Self::EnclaveRotateAuthorityFilter(value)
        }
    }
    impl ::core::convert::From<EnclaveVerifyRequestFilter> for SwitchboardEvents {
        fn from(value: EnclaveVerifyRequestFilter) -> Self {
            Self::EnclaveVerifyRequestFilter(value)
        }
    }
    impl ::core::convert::From<FunctionAccountInitFilter> for SwitchboardEvents {
        fn from(value: FunctionAccountInitFilter) -> Self {
            Self::FunctionAccountInitFilter(value)
        }
    }
    impl ::core::convert::From<FunctionCallEventFilter> for SwitchboardEvents {
        fn from(value: FunctionCallEventFilter) -> Self {
            Self::FunctionCallEventFilter(value)
        }
    }
    impl ::core::convert::From<FunctionCallFailureFilter> for SwitchboardEvents {
        fn from(value: FunctionCallFailureFilter) -> Self {
            Self::FunctionCallFailureFilter(value)
        }
    }
    impl ::core::convert::From<FunctionCallFundFilter> for SwitchboardEvents {
        fn from(value: FunctionCallFundFilter) -> Self {
            Self::FunctionCallFundFilter(value)
        }
    }
    impl ::core::convert::From<FunctionFundFilter> for SwitchboardEvents {
        fn from(value: FunctionFundFilter) -> Self {
            Self::FunctionFundFilter(value)
        }
    }
    impl ::core::convert::From<FunctionWithdrawFilter> for SwitchboardEvents {
        fn from(value: FunctionWithdrawFilter) -> Self {
            Self::FunctionWithdrawFilter(value)
        }
    }
    impl ::core::convert::From<NewRandomValueFilter> for SwitchboardEvents {
        fn from(value: NewRandomValueFilter) -> Self {
            Self::NewRandomValueFilter(value)
        }
    }
    impl ::core::convert::From<OracleAccountInitFilter> for SwitchboardEvents {
        fn from(value: OracleAccountInitFilter) -> Self {
            Self::OracleAccountInitFilter(value)
        }
    }
    impl ::core::convert::From<OracleGCFilter> for SwitchboardEvents {
        fn from(value: OracleGCFilter) -> Self {
            Self::OracleGCFilter(value)
        }
    }
    impl ::core::convert::From<OracleHeartbeatFilter> for SwitchboardEvents {
        fn from(value: OracleHeartbeatFilter) -> Self {
            Self::OracleHeartbeatFilter(value)
        }
    }
    impl ::core::convert::From<OraclePayoutEventFilter> for SwitchboardEvents {
        fn from(value: OraclePayoutEventFilter) -> Self {
            Self::OraclePayoutEventFilter(value)
        }
    }
    impl ::core::convert::From<OracleQueueAccountInitFilter> for SwitchboardEvents {
        fn from(value: OracleQueueAccountInitFilter) -> Self {
            Self::OracleQueueAccountInitFilter(value)
        }
    }
    impl ::core::convert::From<OracleQueueAddMrEnclaveFilter> for SwitchboardEvents {
        fn from(value: OracleQueueAddMrEnclaveFilter) -> Self {
            Self::OracleQueueAddMrEnclaveFilter(value)
        }
    }
    impl ::core::convert::From<OracleQueueRemoveMrEnclaveFilter> for SwitchboardEvents {
        fn from(value: OracleQueueRemoveMrEnclaveFilter) -> Self {
            Self::OracleQueueRemoveMrEnclaveFilter(value)
        }
    }
    impl ::core::convert::From<OracleQueueSetAttestationConfigFilter> for SwitchboardEvents {
        fn from(value: OracleQueueSetAttestationConfigFilter) -> Self {
            Self::OracleQueueSetAttestationConfigFilter(value)
        }
    }
    impl ::core::convert::From<OracleQueueSetConfigFilter> for SwitchboardEvents {
        fn from(value: OracleQueueSetConfigFilter) -> Self {
            Self::OracleQueueSetConfigFilter(value)
        }
    }
    impl ::core::convert::From<OracleQueueSetPermissionFilter> for SwitchboardEvents {
        fn from(value: OracleQueueSetPermissionFilter) -> Self {
            Self::OracleQueueSetPermissionFilter(value)
        }
    }
    impl ::core::convert::From<OracleSetConfigFilter> for SwitchboardEvents {
        fn from(value: OracleSetConfigFilter) -> Self {
            Self::OracleSetConfigFilter(value)
        }
    }
    impl ::core::convert::From<OwnershipTransferredFilter> for SwitchboardEvents {
        fn from(value: OwnershipTransferredFilter) -> Self {
            Self::OwnershipTransferredFilter(value)
        }
    }
    impl ::core::convert::From<RemoveMrEnclaveFilter> for SwitchboardEvents {
        fn from(value: RemoveMrEnclaveFilter) -> Self {
            Self::RemoveMrEnclaveFilter(value)
        }
    }
    ///Container type for all input parameters for the `addMrEnclaveToAttestationQueue` function with signature `addMrEnclaveToAttestationQueue(address,bytes32)` and selector `0xad435b9d`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "addMrEnclaveToAttestationQueue",
        abi = "addMrEnclaveToAttestationQueue(address,bytes32)"
    )]
    pub struct AddMrEnclaveToAttestationQueueCall {
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all input parameters for the `addMrEnclaveToOracleQueue` function with signature `addMrEnclaveToOracleQueue(address,bytes32)` and selector `0x51a426d8`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "addMrEnclaveToOracleQueue",
        abi = "addMrEnclaveToOracleQueue(address,bytes32)"
    )]
    pub struct AddMrEnclaveToOracleQueueCall {
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all input parameters for the `aggregatorEscrowFund` function with signature `aggregatorEscrowFund(address)` and selector `0xd55dcc5b`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "aggregatorEscrowFund", abi = "aggregatorEscrowFund(address)")]
    pub struct AggregatorEscrowFundCall {
        pub account_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `aggregatorEscrowWithdraw` function with signature `aggregatorEscrowWithdraw(address,address,uint256)` and selector `0x202dd499`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "aggregatorEscrowWithdraw",
        abi = "aggregatorEscrowWithdraw(address,address,uint256)"
    )]
    pub struct AggregatorEscrowWithdrawCall {
        pub recipient: ::ethers::core::types::Address,
        pub aggregator_id: ::ethers::core::types::Address,
        pub amount: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `aggregatorHistory` function with signature `aggregatorHistory(address,uint80)` and selector `0x8625bd08`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "aggregatorHistory", abi = "aggregatorHistory(address,uint80)")]
    pub struct AggregatorHistoryCall {
        pub aggregator_id: ::ethers::core::types::Address,
        pub round_id: u128,
    }
    ///Container type for all input parameters for the `aggregators` function with signature `aggregators(address)` and selector `0x112cdab9`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "aggregators", abi = "aggregators(address)")]
    pub struct AggregatorsCall {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `attestationQueueHasMrEnclave` function with signature `attestationQueueHasMrEnclave(address,bytes32)` and selector `0x63fcd771`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "attestationQueueHasMrEnclave",
        abi = "attestationQueueHasMrEnclave(address,bytes32)"
    )]
    pub struct AttestationQueueHasMrEnclaveCall {
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all input parameters for the `attestationQueues` function with signature `attestationQueues(address)` and selector `0x8bb3048c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "attestationQueues", abi = "attestationQueues(address)")]
    pub struct AttestationQueuesCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `callFunction` function with signature `callFunction(address,bytes)` and selector `0x9c23da50`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "callFunction", abi = "callFunction(address,bytes)")]
    pub struct CallFunctionCall {
        pub function_id: ::ethers::core::types::Address,
        pub params: ::ethers::core::types::Bytes,
    }
    ///Container type for all input parameters for the `callback` function with signature `callback(uint256)` and selector `0xff585caf`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "callback", abi = "callback(uint256)")]
    pub struct CallbackCall {
        pub value: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `createAggregator` function with signature `createAggregator(string,address,uint256,uint256,uint256,string,address,uint256,uint256,uint256,bool)` and selector `0x84ed8177`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createAggregator",
        abi = "createAggregator(string,address,uint256,uint256,uint256,string,address,uint256,uint256,uint256,bool)"
    )]
    pub struct CreateAggregatorCall {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub batch_size: ::ethers::core::types::U256,
        pub min_update_delay_seconds: ::ethers::core::types::U256,
        pub min_oracle_results: ::ethers::core::types::U256,
        pub jobs_hash: ::std::string::String,
        pub queue_id: ::ethers::core::types::Address,
        pub variance_threshold: ::ethers::core::types::U256,
        pub min_job_results: ::ethers::core::types::U256,
        pub force_report_period: ::ethers::core::types::U256,
        pub enable_history: bool,
    }
    ///Container type for all input parameters for the `createAttestationQueue` function with signature `createAttestationQueue(address,uint256,uint256,uint256,uint256,uint256,bool,bool,uint256)` and selector `0xde776851`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createAttestationQueue",
        abi = "createAttestationQueue(address,uint256,uint256,uint256,uint256,uint256,bool,bool,uint256)"
    )]
    pub struct CreateAttestationQueueCall {
        pub authority: ::ethers::core::types::Address,
        pub max_size: ::ethers::core::types::U256,
        pub reward: ::ethers::core::types::U256,
        pub enclave_timeout: ::ethers::core::types::U256,
        pub max_enclave_verification_age: ::ethers::core::types::U256,
        pub allow_authority_override_after: ::ethers::core::types::U256,
        pub require_authority_heartbeat_permission: bool,
        pub require_usage_permissions: bool,
        pub max_consecutive_function_failures: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `createEnclave` function with signature `createEnclave(address,address,address)` and selector `0xcf392e2f`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "createEnclave", abi = "createEnclave(address,address,address)")]
    pub struct CreateEnclaveCall {
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `createEnclaveWithId` function with signature `createEnclaveWithId(address,address,address,address)` and selector `0xc7c1143e`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createEnclaveWithId",
        abi = "createEnclaveWithId(address,address,address,address)"
    )]
    pub struct CreateEnclaveWithIdCall {
        pub enclave_id: ::ethers::core::types::Address,
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `createFunction` function with signature `createFunction(string,address,address,string,string,string,string,string,address[])` and selector `0xc4829580`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createFunction",
        abi = "createFunction(string,address,address,string,string,string,string,string,address[])"
    )]
    pub struct CreateFunctionCall {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub container_registry: ::std::string::String,
        pub container: ::std::string::String,
        pub version: ::std::string::String,
        pub schedule: ::std::string::String,
        pub params_schema: ::std::string::String,
        pub permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
    }
    ///Container type for all input parameters for the `createFunctionWithId` function with signature `createFunctionWithId(address,string,address,address,string,string,string,string,string,address[])` and selector `0xcd86c71b`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createFunctionWithId",
        abi = "createFunctionWithId(address,string,address,address,string,string,string,string,string,address[])"
    )]
    pub struct CreateFunctionWithIdCall {
        pub function_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub container_registry: ::std::string::String,
        pub container: ::std::string::String,
        pub version: ::std::string::String,
        pub schedule: ::std::string::String,
        pub params_schema: ::std::string::String,
        pub permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
    }
    ///Container type for all input parameters for the `createOracle` function with signature `createOracle(string,address,address,address)` and selector `0xf843b846`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createOracle",
        abi = "createOracle(string,address,address,address)"
    )]
    pub struct CreateOracleCall {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `createOracleQueue` function with signature `createOracleQueue(string,address,bool,uint256,uint256,uint256)` and selector `0xe7675651`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createOracleQueue",
        abi = "createOracleQueue(string,address,bool,uint256,uint256,uint256)"
    )]
    pub struct CreateOracleQueueCall {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub unpermissioned_feeds_enabled: bool,
        pub max_size: ::ethers::core::types::U256,
        pub reward: ::ethers::core::types::U256,
        pub oracle_timeout: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `createOracleWithId` function with signature `createOracleWithId(address,string,address,address,address)` and selector `0x16703130`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "createOracleWithId",
        abi = "createOracleWithId(address,string,address,address,address)"
    )]
    pub struct CreateOracleWithIdCall {
        pub oracle_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `diamondCut` function with signature `diamondCut((address,uint8,bytes4[])[],address,bytes)` and selector `0x1f931c1c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "diamondCut",
        abi = "diamondCut((address,uint8,bytes4[])[],address,bytes)"
    )]
    pub struct DiamondCutCall {
        pub diamond_cut: ::std::vec::Vec<FacetCut>,
        pub init: ::ethers::core::types::Address,
        pub calldata: ::ethers::core::types::Bytes,
    }
    ///Container type for all input parameters for the `enclaveAuthorityToEnclaveAddress` function with signature `enclaveAuthorityToEnclaveAddress(address)` and selector `0x5a6fe378`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "enclaveAuthorityToEnclaveAddress",
        abi = "enclaveAuthorityToEnclaveAddress(address)"
    )]
    pub struct EnclaveAuthorityToEnclaveAddressCall {
        pub authority: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `enclaveGarbageCollect` function with signature `enclaveGarbageCollect(address,uint256)` and selector `0xc06e4eda`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "enclaveGarbageCollect",
        abi = "enclaveGarbageCollect(address,uint256)"
    )]
    pub struct EnclaveGarbageCollectCall {
        pub enclave_id: ::ethers::core::types::Address,
        pub enclave_idx: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `enclaveHeartbeat` function with signature `enclaveHeartbeat(address)` and selector `0xce834437`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "enclaveHeartbeat", abi = "enclaveHeartbeat(address)")]
    pub struct EnclaveHeartbeatCall {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `enclaves` function with signature `enclaves(address)` and selector `0xfaeedb07`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "enclaves", abi = "enclaves(address)")]
    pub struct EnclavesCall {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `facetAddress` function with signature `facetAddress(bytes4)` and selector `0xcdffacc6`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "facetAddress", abi = "facetAddress(bytes4)")]
    pub struct FacetAddressCall {
        pub function_selector: [u8; 4],
    }
    ///Container type for all input parameters for the `facetAddresses` function with signature `facetAddresses()` and selector `0x52ef6b2c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "facetAddresses", abi = "facetAddresses()")]
    pub struct FacetAddressesCall;
    ///Container type for all input parameters for the `facetFunctionSelectors` function with signature `facetFunctionSelectors(address)` and selector `0xadfca15e`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "facetFunctionSelectors",
        abi = "facetFunctionSelectors(address)"
    )]
    pub struct FacetFunctionSelectorsCall {
        pub facet: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `facets` function with signature `facets()` and selector `0x7a0ed627`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "facets", abi = "facets()")]
    pub struct FacetsCall;
    ///Container type for all input parameters for the `failEnclave` function with signature `failEnclave(address,address,uint256)` and selector `0x39d920e6`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "failEnclave", abi = "failEnclave(address,address,uint256)")]
    pub struct FailEnclaveCall {
        pub verifier_id: ::ethers::core::types::Address,
        pub enclave_id: ::ethers::core::types::Address,
        pub verifier_idx: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `forceOverrideVerify` function with signature `forceOverrideVerify(address)` and selector `0xe231b12f`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "forceOverrideVerify", abi = "forceOverrideVerify(address)")]
    pub struct ForceOverrideVerifyCall {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `forward` function with signature `forward((uint256,uint256,uint256,address,address,bytes)[],bytes[])` and selector `0x7096052c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "forward",
        abi = "forward((uint256,uint256,uint256,address,address,bytes)[],bytes[])"
    )]
    pub struct ForwardCall {
        pub transactions: ::std::vec::Vec<Transaction>,
        pub signatures: ::std::vec::Vec<::ethers::core::types::Bytes>,
    }
    ///Container type for all input parameters for the `funcs` function with signature `funcs(address)` and selector `0x8ef92003`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "funcs", abi = "funcs(address)")]
    pub struct FuncsCall {
        pub function_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `functionEscrowFund` function with signature `functionEscrowFund(address)` and selector `0xba93166c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "functionEscrowFund", abi = "functionEscrowFund(address)")]
    pub struct FunctionEscrowFundCall {
        pub account_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `functionEscrowWithdraw` function with signature `functionEscrowWithdraw(address,address,uint256)` and selector `0xa29baf1e`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "functionEscrowWithdraw",
        abi = "functionEscrowWithdraw(address,address,uint256)"
    )]
    pub struct FunctionEscrowWithdrawCall {
        pub recipient: ::ethers::core::types::Address,
        pub function_id: ::ethers::core::types::Address,
        pub amount: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `functionExists` function with signature `functionExists(address)` and selector `0xa13001c9`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "functionExists", abi = "functionExists(address)")]
    pub struct FunctionExistsCall {
        pub function_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getActiveFunctionCallsByQueue` function with signature `getActiveFunctionCallsByQueue(address)` and selector `0xfa88c651`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getActiveFunctionCallsByQueue",
        abi = "getActiveFunctionCallsByQueue(address)"
    )]
    pub struct GetActiveFunctionCallsByQueueCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getActiveFunctionsByQueue` function with signature `getActiveFunctionsByQueue(address)` and selector `0x1fc747b7`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getActiveFunctionsByQueue",
        abi = "getActiveFunctionsByQueue(address)"
    )]
    pub struct GetActiveFunctionsByQueueCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getAggregatorsByAuthority` function with signature `getAggregatorsByAuthority(address)` and selector `0x911c30f3`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getAggregatorsByAuthority",
        abi = "getAggregatorsByAuthority(address)"
    )]
    pub struct GetAggregatorsByAuthorityCall {
        pub user: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getAllAggregators` function with signature `getAllAggregators()` and selector `0x465c65dd`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getAllAggregators", abi = "getAllAggregators()")]
    pub struct GetAllAggregatorsCall;
    ///Container type for all input parameters for the `getAllFunctions` function with signature `getAllFunctions()` and selector `0xab6418b4`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getAllFunctions", abi = "getAllFunctions()")]
    pub struct GetAllFunctionsCall;
    ///Container type for all input parameters for the `getAttestationQueueMrEnclaves` function with signature `getAttestationQueueMrEnclaves(address)` and selector `0x0f3bc418`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getAttestationQueueMrEnclaves",
        abi = "getAttestationQueueMrEnclaves(address)"
    )]
    pub struct GetAttestationQueueMrEnclavesCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getCurrentIntervalId` function with signature `getCurrentIntervalId(address)` and selector `0x1dc1da86`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getCurrentIntervalId", abi = "getCurrentIntervalId(address)")]
    pub struct GetCurrentIntervalIdCall {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getEnclaveIdx` function with signature `getEnclaveIdx(address)` and selector `0x21fb3bbc`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getEnclaveIdx", abi = "getEnclaveIdx(address)")]
    pub struct GetEnclaveIdxCall {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getEnclaves` function with signature `getEnclaves(address)` and selector `0x340dd88b`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getEnclaves", abi = "getEnclaves(address)")]
    pub struct GetEnclavesCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getFunctionsByAuthority` function with signature `getFunctionsByAuthority(address)` and selector `0x357f633f`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getFunctionsByAuthority",
        abi = "getFunctionsByAuthority(address)"
    )]
    pub struct GetFunctionsByAuthorityCall {
        pub user: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getIntervalResult` function with signature `getIntervalResult(address,uint80)` and selector `0x3d24ef6e`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getIntervalResult", abi = "getIntervalResult(address,uint80)")]
    pub struct GetIntervalResultCall {
        pub aggregator_id: ::ethers::core::types::Address,
        pub interval_id: u128,
    }
    ///Container type for all input parameters for the `getOracleIdx` function with signature `getOracleIdx(address)` and selector `0xd87dd0ac`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getOracleIdx", abi = "getOracleIdx(address)")]
    pub struct GetOracleIdxCall {
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getOracleQueueAllowedMrEnclaves` function with signature `getOracleQueueAllowedMrEnclaves(address)` and selector `0xf04b0f59`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getOracleQueueAllowedMrEnclaves",
        abi = "getOracleQueueAllowedMrEnclaves(address)"
    )]
    pub struct GetOracleQueueAllowedMrEnclavesCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getOracles` function with signature `getOracles(address)` and selector `0x8e749281`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getOracles", abi = "getOracles(address)")]
    pub struct GetOraclesCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getPermission` function with signature `getPermission(address,address)` and selector `0x910185dd`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "getPermission", abi = "getPermission(address,address)")]
    pub struct GetPermissionCall {
        pub granter: ::ethers::core::types::Address,
        pub grantee: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `getTransactionHash` function with signature `getTransactionHash(uint256,uint256,uint256,address,address,bytes)` and selector `0xd93f1970`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "getTransactionHash",
        abi = "getTransactionHash(uint256,uint256,uint256,address,address,bytes)"
    )]
    pub struct GetTransactionHashCall {
        pub expiration_time_seconds: ::ethers::core::types::U256,
        pub gas_limit: ::ethers::core::types::U256,
        pub value: ::ethers::core::types::U256,
        pub to: ::ethers::core::types::Address,
        pub from: ::ethers::core::types::Address,
        pub data: ::ethers::core::types::Bytes,
    }
    ///Container type for all input parameters for the `hasPermission` function with signature `hasPermission(address,address,uint256)` and selector `0x8b01813d`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "hasPermission", abi = "hasPermission(address,address,uint256)")]
    pub struct HasPermissionCall {
        pub granter: ::ethers::core::types::Address,
        pub grantee: ::ethers::core::types::Address,
        pub permission: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `init` function with signature `init()` and selector `0xe1c7392a`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "init", abi = "init()")]
    pub struct InitCall;
    ///Container type for all input parameters for the `initialize` function with signature `initialize()` and selector `0x8129fc1c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "initialize", abi = "initialize()")]
    pub struct InitializeCall;
    ///Container type for all input parameters for the `isAdmin` function with signature `isAdmin(address)` and selector `0x24d7806c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "isAdmin", abi = "isAdmin(address)")]
    pub struct IsAdminCall {
        pub sender: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `isAllowed` function with signature `isAllowed(address)` and selector `0xbabcc539`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "isAllowed", abi = "isAllowed(address)")]
    pub struct IsAllowedCall {
        pub sender: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `isEnclaveValid` function with signature `isEnclaveValid(address)` and selector `0xfb4acdfe`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "isEnclaveValid", abi = "isEnclaveValid(address)")]
    pub struct IsEnclaveValidCall {
        pub enclave_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `isTrustedForwarder` function with signature `isTrustedForwarder(address)` and selector `0x572b6c05`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "isTrustedForwarder", abi = "isTrustedForwarder(address)")]
    pub struct IsTrustedForwarderCall(pub ::ethers::core::types::Address);
    ///Container type for all input parameters for the `latestResult` function with signature `latestResult(address)` and selector `0xfab005a2`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "latestResult", abi = "latestResult(address)")]
    pub struct LatestResultCall {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `openInterval` function with signature `openInterval(address)` and selector `0x0f2544be`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "openInterval", abi = "openInterval(address)")]
    pub struct OpenIntervalCall {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `oracleGarbageCollect` function with signature `oracleGarbageCollect(address,uint256)` and selector `0x71da68ff`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "oracleGarbageCollect",
        abi = "oracleGarbageCollect(address,uint256)"
    )]
    pub struct OracleGarbageCollectCall {
        pub oracle_id: ::ethers::core::types::Address,
        pub oracle_idx: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `oracleHeartbeat` function with signature `oracleHeartbeat(address)` and selector `0xf53b638c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "oracleHeartbeat", abi = "oracleHeartbeat(address)")]
    pub struct OracleHeartbeatCall {
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `oracleQueues` function with signature `oracleQueues(address)` and selector `0xf2378e88`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "oracleQueues", abi = "oracleQueues(address)")]
    pub struct OracleQueuesCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `oracles` function with signature `oracles(address)` and selector `0xaddd5099`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "oracles", abi = "oracles(address)")]
    pub struct OraclesCall {
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `owner` function with signature `owner()` and selector `0x8da5cb5b`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "owner", abi = "owner()")]
    pub struct OwnerCall;
    ///Container type for all input parameters for the `queueAttestationConfigs` function with signature `queueAttestationConfigs(address)` and selector `0x6ddc9122`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "queueAttestationConfigs",
        abi = "queueAttestationConfigs(address)"
    )]
    pub struct QueueAttestationConfigsCall {
        pub queue_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `randomValue` function with signature `randomValue()` and selector `0x276801ec`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "randomValue", abi = "randomValue()")]
    pub struct RandomValueCall;
    ///Container type for all input parameters for the `removeMrEnclaveFromAttestationQueue` function with signature `removeMrEnclaveFromAttestationQueue(address,bytes32)` and selector `0x083f30cf`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "removeMrEnclaveFromAttestationQueue",
        abi = "removeMrEnclaveFromAttestationQueue(address,bytes32)"
    )]
    pub struct RemoveMrEnclaveFromAttestationQueueCall {
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all input parameters for the `removeMrEnclaveFromOracleQueue` function with signature `removeMrEnclaveFromOracleQueue(address,bytes32)` and selector `0x262955d8`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "removeMrEnclaveFromOracleQueue",
        abi = "removeMrEnclaveFromOracleQueue(address,bytes32)"
    )]
    pub struct RemoveMrEnclaveFromOracleQueueCall {
        pub queue_id: ::ethers::core::types::Address,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all input parameters for the `rotateEnclaveAuthority` function with signature `rotateEnclaveAuthority(address,address)` and selector `0xd4d832aa`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "rotateEnclaveAuthority",
        abi = "rotateEnclaveAuthority(address,address)"
    )]
    pub struct RotateEnclaveAuthorityCall {
        pub enclave_id: ::ethers::core::types::Address,
        pub new_authority: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `rotateOracleAuthority` function with signature `rotateOracleAuthority(address,address)` and selector `0x4cfb1758`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "rotateOracleAuthority",
        abi = "rotateOracleAuthority(address,address)"
    )]
    pub struct RotateOracleAuthorityCall {
        pub oracle_id: ::ethers::core::types::Address,
        pub new_authority: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `saveResults` function with signature `saveResults(address[],int256[],address,uint256)` and selector `0x735e3555`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "saveResults",
        abi = "saveResults(address[],int256[],address,uint256)"
    )]
    pub struct SaveResultsCall {
        pub ids: ::std::vec::Vec<::ethers::core::types::Address>,
        pub results: ::std::vec::Vec<::ethers::core::types::I256>,
        pub queue_id: ::ethers::core::types::Address,
        pub oracle_idx: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `setAdmin` function with signature `setAdmin(address,bool)` and selector `0x4b0bddd2`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "setAdmin", abi = "setAdmin(address,bool)")]
    pub struct SetAdminCall {
        pub sender: ::ethers::core::types::Address,
        pub status: bool,
    }
    ///Container type for all input parameters for the `setAggregatorConfig` function with signature `setAggregatorConfig(address,string,address,uint256,uint256,uint256,string,address,uint256,uint256,uint256,bool)` and selector `0xdd0ad73a`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setAggregatorConfig",
        abi = "setAggregatorConfig(address,string,address,uint256,uint256,uint256,string,address,uint256,uint256,uint256,bool)"
    )]
    pub struct SetAggregatorConfigCall {
        pub aggregator_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub batch_size: ::ethers::core::types::U256,
        pub min_update_delay_seconds: ::ethers::core::types::U256,
        pub min_oracle_results: ::ethers::core::types::U256,
        pub jobs_hash: ::std::string::String,
        pub queue_id: ::ethers::core::types::Address,
        pub variance_threshold: ::ethers::core::types::U256,
        pub min_job_results: ::ethers::core::types::U256,
        pub force_report_period: ::ethers::core::types::U256,
        pub enable_history: bool,
    }
    ///Container type for all input parameters for the `setAllowed` function with signature `setAllowed(address,bool)` and selector `0x4697f05d`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "setAllowed", abi = "setAllowed(address,bool)")]
    pub struct SetAllowedCall {
        pub sender: ::ethers::core::types::Address,
        pub status: bool,
    }
    ///Container type for all input parameters for the `setAttestationQueueConfig` function with signature `setAttestationQueueConfig(address,address,uint256,uint256,uint256,uint256,uint256,bool,bool,uint256)` and selector `0xf7d48307`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setAttestationQueueConfig",
        abi = "setAttestationQueueConfig(address,address,uint256,uint256,uint256,uint256,uint256,bool,bool,uint256)"
    )]
    pub struct SetAttestationQueueConfigCall {
        pub queue_id: ::ethers::core::types::Address,
        pub authority: ::ethers::core::types::Address,
        pub max_size: ::ethers::core::types::U256,
        pub reward: ::ethers::core::types::U256,
        pub enclave_timeout: ::ethers::core::types::U256,
        pub max_enclave_verification_age: ::ethers::core::types::U256,
        pub allow_authority_override_after: ::ethers::core::types::U256,
        pub require_authority_heartbeat_permission: bool,
        pub require_usage_permissions: bool,
        pub max_consecutive_function_failures: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `setAttestationQueuePermission` function with signature `setAttestationQueuePermission(address,address,uint256,bool)` and selector `0xa77a07d3`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setAttestationQueuePermission",
        abi = "setAttestationQueuePermission(address,address,uint256,bool)"
    )]
    pub struct SetAttestationQueuePermissionCall {
        pub queue_id: ::ethers::core::types::Address,
        pub grantee: ::ethers::core::types::Address,
        pub permission: ::ethers::core::types::U256,
        pub on: bool,
    }
    ///Container type for all input parameters for the `setFunctionConfig` function with signature `setFunctionConfig(address,string,address,string,string,string,string,string,address[])` and selector `0x822e99d5`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setFunctionConfig",
        abi = "setFunctionConfig(address,string,address,string,string,string,string,string,address[])"
    )]
    pub struct SetFunctionConfigCall {
        pub function_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub container_registry: ::std::string::String,
        pub container: ::std::string::String,
        pub version: ::std::string::String,
        pub schedule: ::std::string::String,
        pub params_schema: ::std::string::String,
        pub permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
    }
    ///Container type for all input parameters for the `setOracleConfig` function with signature `setOracleConfig(address,string,address,address,address)` and selector `0xf50b5ed0`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setOracleConfig",
        abi = "setOracleConfig(address,string,address,address,address)"
    )]
    pub struct SetOracleConfigCall {
        pub oracle_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `setOracleQueueAttestationConfig` function with signature `setOracleQueueAttestationConfig(address,address,bytes32[],bool,bool)` and selector `0x88033af5`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setOracleQueueAttestationConfig",
        abi = "setOracleQueueAttestationConfig(address,address,bytes32[],bool,bool)"
    )]
    pub struct SetOracleQueueAttestationConfigCall {
        pub queue_id: ::ethers::core::types::Address,
        pub attestation_queue_id: ::ethers::core::types::Address,
        pub mr_enclaves: ::std::vec::Vec<[u8; 32]>,
        pub require_valid_enclave: bool,
        pub require_heartbeat_permission: bool,
    }
    ///Container type for all input parameters for the `setOracleQueueConfig` function with signature `setOracleQueueConfig(address,string,address,bool,uint256,uint256,uint256)` and selector `0xb6590411`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setOracleQueueConfig",
        abi = "setOracleQueueConfig(address,string,address,bool,uint256,uint256,uint256)"
    )]
    pub struct SetOracleQueueConfigCall {
        pub queue_id: ::ethers::core::types::Address,
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub unpermissioned_feeds_enabled: bool,
        pub max_size: ::ethers::core::types::U256,
        pub reward: ::ethers::core::types::U256,
        pub oracle_timeout: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `setOracleQueuePermission` function with signature `setOracleQueuePermission(address,address,uint256,bool)` and selector `0x01fc1ba2`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setOracleQueuePermission",
        abi = "setOracleQueuePermission(address,address,uint256,bool)"
    )]
    pub struct SetOracleQueuePermissionCall {
        pub queue_id: ::ethers::core::types::Address,
        pub grantee: ::ethers::core::types::Address,
        pub permission: ::ethers::core::types::U256,
        pub on: bool,
    }
    ///Container type for all input parameters for the `setToleratedTimestampDiscrepancy` function with signature `setToleratedTimestampDiscrepancy(uint256)` and selector `0x101277b2`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "setToleratedTimestampDiscrepancy",
        abi = "setToleratedTimestampDiscrepancy(uint256)"
    )]
    pub struct SetToleratedTimestampDiscrepancyCall {
        pub tolerance: ::ethers::core::types::U256,
    }
    ///Container type for all input parameters for the `supportsInterface` function with signature `supportsInterface(bytes4)` and selector `0x01ffc9a7`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "supportsInterface", abi = "supportsInterface(bytes4)")]
    pub struct SupportsInterfaceCall {
        pub interface_id: [u8; 4],
    }
    ///Container type for all input parameters for the `transferOwnership` function with signature `transferOwnership(address)` and selector `0xf2fde38b`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "transferOwnership", abi = "transferOwnership(address)")]
    pub struct TransferOwnershipCall {
        pub new_owner: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `updateEnclave` function with signature `updateEnclave(address,bytes)` and selector `0x5cd6ac0c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "updateEnclave", abi = "updateEnclave(address,bytes)")]
    pub struct UpdateEnclaveCall {
        pub enclave_id: ::ethers::core::types::Address,
        pub cid: ::ethers::core::types::Bytes,
    }
    ///Container type for all input parameters for the `validate` function with signature `validate(address,address,bytes32[])` and selector `0x1755a7f8`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "validate", abi = "validate(address,address,bytes32[])")]
    pub struct ValidateCall {
        pub authority: ::ethers::core::types::Address,
        pub attestation_queue_id: ::ethers::core::types::Address,
        pub valid_measurements: ::std::vec::Vec<[u8; 32]>,
    }
    ///Container type for all input parameters for the `verifyEnclave` function with signature `verifyEnclave(address,address,uint256,uint256,bytes32)` and selector `0xef0ebd71`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "verifyEnclave",
        abi = "verifyEnclave(address,address,uint256,uint256,bytes32)"
    )]
    pub struct VerifyEnclaveCall {
        pub verifier_id: ::ethers::core::types::Address,
        pub enclave_id: ::ethers::core::types::Address,
        pub enclave_idx: ::ethers::core::types::U256,
        pub timestamp: ::ethers::core::types::U256,
        pub mr_enclave: [u8; 32],
    }
    ///Container type for all input parameters for the `verifyFunction` function with signature `verifyFunction(uint256,address,address,uint256,uint256,bool,bytes32,(uint256,uint256,uint256,address,address,bytes)[],bytes[])` and selector `0x8cc5b02c`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(
        name = "verifyFunction",
        abi = "verifyFunction(uint256,address,address,uint256,uint256,bool,bytes32,(uint256,uint256,uint256,address,address,bytes)[],bytes[])"
    )]
    pub struct VerifyFunctionCall {
        pub enclave_idx: ::ethers::core::types::U256,
        pub function_id: ::ethers::core::types::Address,
        pub delegated_signer_address: ::ethers::core::types::Address,
        pub observed_time: ::ethers::core::types::U256,
        pub next_allowed_timestamp: ::ethers::core::types::U256,
        pub is_failure: bool,
        pub mr_enclave: [u8; 32],
        pub transactions: ::std::vec::Vec<Transaction>,
        pub signatures: ::std::vec::Vec<::ethers::core::types::Bytes>,
    }
    ///Container type for all input parameters for the `viewAggregatorResults` function with signature `viewAggregatorResults(address)` and selector `0xde866484`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "viewAggregatorResults", abi = "viewAggregatorResults(address)")]
    pub struct ViewAggregatorResultsCall {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Container type for all input parameters for the `viewLatestResult` function with signature `viewLatestResult(address)` and selector `0xbdf5edef`
    #[derive(
        Clone,
        ::ethers::contract::EthCall,
        ::ethers::contract::EthDisplay,
        Default,
        Debug,
        PartialEq,
        Eq,
        Hash,
    )]
    #[ethcall(name = "viewLatestResult", abi = "viewLatestResult(address)")]
    pub struct ViewLatestResultCall {
        pub aggregator_id: ::ethers::core::types::Address,
    }
    ///Container type for all of the contract's call
    #[derive(Clone, ::ethers::contract::EthAbiType, Debug, PartialEq, Eq, Hash)]
    pub enum SwitchboardCalls {
        AddMrEnclaveToAttestationQueue(AddMrEnclaveToAttestationQueueCall),
        AddMrEnclaveToOracleQueue(AddMrEnclaveToOracleQueueCall),
        AggregatorEscrowFund(AggregatorEscrowFundCall),
        AggregatorEscrowWithdraw(AggregatorEscrowWithdrawCall),
        AggregatorHistory(AggregatorHistoryCall),
        Aggregators(AggregatorsCall),
        AttestationQueueHasMrEnclave(AttestationQueueHasMrEnclaveCall),
        AttestationQueues(AttestationQueuesCall),
        CallFunction(CallFunctionCall),
        Callback(CallbackCall),
        CreateAggregator(CreateAggregatorCall),
        CreateAttestationQueue(CreateAttestationQueueCall),
        CreateEnclave(CreateEnclaveCall),
        CreateEnclaveWithId(CreateEnclaveWithIdCall),
        CreateFunction(CreateFunctionCall),
        CreateFunctionWithId(CreateFunctionWithIdCall),
        CreateOracle(CreateOracleCall),
        CreateOracleQueue(CreateOracleQueueCall),
        CreateOracleWithId(CreateOracleWithIdCall),
        DiamondCut(DiamondCutCall),
        EnclaveAuthorityToEnclaveAddress(EnclaveAuthorityToEnclaveAddressCall),
        EnclaveGarbageCollect(EnclaveGarbageCollectCall),
        EnclaveHeartbeat(EnclaveHeartbeatCall),
        Enclaves(EnclavesCall),
        FacetAddress(FacetAddressCall),
        FacetAddresses(FacetAddressesCall),
        FacetFunctionSelectors(FacetFunctionSelectorsCall),
        Facets(FacetsCall),
        FailEnclave(FailEnclaveCall),
        ForceOverrideVerify(ForceOverrideVerifyCall),
        Forward(ForwardCall),
        Funcs(FuncsCall),
        FunctionEscrowFund(FunctionEscrowFundCall),
        FunctionEscrowWithdraw(FunctionEscrowWithdrawCall),
        FunctionExists(FunctionExistsCall),
        GetActiveFunctionCallsByQueue(GetActiveFunctionCallsByQueueCall),
        GetActiveFunctionsByQueue(GetActiveFunctionsByQueueCall),
        GetAggregatorsByAuthority(GetAggregatorsByAuthorityCall),
        GetAllAggregators(GetAllAggregatorsCall),
        GetAllFunctions(GetAllFunctionsCall),
        GetAttestationQueueMrEnclaves(GetAttestationQueueMrEnclavesCall),
        GetCurrentIntervalId(GetCurrentIntervalIdCall),
        GetEnclaveIdx(GetEnclaveIdxCall),
        GetEnclaves(GetEnclavesCall),
        GetFunctionsByAuthority(GetFunctionsByAuthorityCall),
        GetIntervalResult(GetIntervalResultCall),
        GetOracleIdx(GetOracleIdxCall),
        GetOracleQueueAllowedMrEnclaves(GetOracleQueueAllowedMrEnclavesCall),
        GetOracles(GetOraclesCall),
        GetPermission(GetPermissionCall),
        GetTransactionHash(GetTransactionHashCall),
        HasPermission(HasPermissionCall),
        Init(InitCall),
        Initialize(InitializeCall),
        IsAdmin(IsAdminCall),
        IsAllowed(IsAllowedCall),
        IsEnclaveValid(IsEnclaveValidCall),
        IsTrustedForwarder(IsTrustedForwarderCall),
        LatestResult(LatestResultCall),
        OpenInterval(OpenIntervalCall),
        OracleGarbageCollect(OracleGarbageCollectCall),
        OracleHeartbeat(OracleHeartbeatCall),
        OracleQueues(OracleQueuesCall),
        Oracles(OraclesCall),
        Owner(OwnerCall),
        QueueAttestationConfigs(QueueAttestationConfigsCall),
        RandomValue(RandomValueCall),
        RemoveMrEnclaveFromAttestationQueue(RemoveMrEnclaveFromAttestationQueueCall),
        RemoveMrEnclaveFromOracleQueue(RemoveMrEnclaveFromOracleQueueCall),
        RotateEnclaveAuthority(RotateEnclaveAuthorityCall),
        RotateOracleAuthority(RotateOracleAuthorityCall),
        SaveResults(SaveResultsCall),
        SetAdmin(SetAdminCall),
        SetAggregatorConfig(SetAggregatorConfigCall),
        SetAllowed(SetAllowedCall),
        SetAttestationQueueConfig(SetAttestationQueueConfigCall),
        SetAttestationQueuePermission(SetAttestationQueuePermissionCall),
        SetFunctionConfig(SetFunctionConfigCall),
        SetOracleConfig(SetOracleConfigCall),
        SetOracleQueueAttestationConfig(SetOracleQueueAttestationConfigCall),
        SetOracleQueueConfig(SetOracleQueueConfigCall),
        SetOracleQueuePermission(SetOracleQueuePermissionCall),
        SetToleratedTimestampDiscrepancy(SetToleratedTimestampDiscrepancyCall),
        SupportsInterface(SupportsInterfaceCall),
        TransferOwnership(TransferOwnershipCall),
        UpdateEnclave(UpdateEnclaveCall),
        Validate(ValidateCall),
        VerifyEnclave(VerifyEnclaveCall),
        VerifyFunction(VerifyFunctionCall),
        ViewAggregatorResults(ViewAggregatorResultsCall),
        ViewLatestResult(ViewLatestResultCall),
    }
    impl ::ethers::core::abi::AbiDecode for SwitchboardCalls {
        fn decode(
            data: impl AsRef<[u8]>,
        ) -> ::core::result::Result<Self, ::ethers::core::abi::AbiError> {
            let data = data.as_ref();
            if let Ok(decoded) =
                <AddMrEnclaveToAttestationQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AddMrEnclaveToAttestationQueue(decoded));
            }
            if let Ok(decoded) =
                <AddMrEnclaveToOracleQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AddMrEnclaveToOracleQueue(decoded));
            }
            if let Ok(decoded) =
                <AggregatorEscrowFundCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AggregatorEscrowFund(decoded));
            }
            if let Ok(decoded) =
                <AggregatorEscrowWithdrawCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AggregatorEscrowWithdraw(decoded));
            }
            if let Ok(decoded) =
                <AggregatorHistoryCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AggregatorHistory(decoded));
            }
            if let Ok(decoded) = <AggregatorsCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Aggregators(decoded));
            }
            if let Ok(decoded) =
                <AttestationQueueHasMrEnclaveCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AttestationQueueHasMrEnclave(decoded));
            }
            if let Ok(decoded) =
                <AttestationQueuesCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::AttestationQueues(decoded));
            }
            if let Ok(decoded) = <CallFunctionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CallFunction(decoded));
            }
            if let Ok(decoded) = <CallbackCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Callback(decoded));
            }
            if let Ok(decoded) =
                <CreateAggregatorCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateAggregator(decoded));
            }
            if let Ok(decoded) =
                <CreateAttestationQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateAttestationQueue(decoded));
            }
            if let Ok(decoded) = <CreateEnclaveCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateEnclave(decoded));
            }
            if let Ok(decoded) =
                <CreateEnclaveWithIdCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateEnclaveWithId(decoded));
            }
            if let Ok(decoded) =
                <CreateFunctionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateFunction(decoded));
            }
            if let Ok(decoded) =
                <CreateFunctionWithIdCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateFunctionWithId(decoded));
            }
            if let Ok(decoded) = <CreateOracleCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateOracle(decoded));
            }
            if let Ok(decoded) =
                <CreateOracleQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateOracleQueue(decoded));
            }
            if let Ok(decoded) =
                <CreateOracleWithIdCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::CreateOracleWithId(decoded));
            }
            if let Ok(decoded) = <DiamondCutCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::DiamondCut(decoded));
            }
            if let Ok(decoded) =
                <EnclaveAuthorityToEnclaveAddressCall as ::ethers::core::abi::AbiDecode>::decode(
                    data,
                )
            {
                return Ok(Self::EnclaveAuthorityToEnclaveAddress(decoded));
            }
            if let Ok(decoded) =
                <EnclaveGarbageCollectCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveGarbageCollect(decoded));
            }
            if let Ok(decoded) =
                <EnclaveHeartbeatCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::EnclaveHeartbeat(decoded));
            }
            if let Ok(decoded) = <EnclavesCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Enclaves(decoded));
            }
            if let Ok(decoded) = <FacetAddressCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FacetAddress(decoded));
            }
            if let Ok(decoded) =
                <FacetAddressesCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FacetAddresses(decoded));
            }
            if let Ok(decoded) =
                <FacetFunctionSelectorsCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FacetFunctionSelectors(decoded));
            }
            if let Ok(decoded) = <FacetsCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Facets(decoded));
            }
            if let Ok(decoded) = <FailEnclaveCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::FailEnclave(decoded));
            }
            if let Ok(decoded) =
                <ForceOverrideVerifyCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ForceOverrideVerify(decoded));
            }
            if let Ok(decoded) = <ForwardCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Forward(decoded));
            }
            if let Ok(decoded) = <FuncsCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Funcs(decoded));
            }
            if let Ok(decoded) =
                <FunctionEscrowFundCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionEscrowFund(decoded));
            }
            if let Ok(decoded) =
                <FunctionEscrowWithdrawCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionEscrowWithdraw(decoded));
            }
            if let Ok(decoded) =
                <FunctionExistsCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::FunctionExists(decoded));
            }
            if let Ok(decoded) =
                <GetActiveFunctionCallsByQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetActiveFunctionCallsByQueue(decoded));
            }
            if let Ok(decoded) =
                <GetActiveFunctionsByQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetActiveFunctionsByQueue(decoded));
            }
            if let Ok(decoded) =
                <GetAggregatorsByAuthorityCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetAggregatorsByAuthority(decoded));
            }
            if let Ok(decoded) =
                <GetAllAggregatorsCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetAllAggregators(decoded));
            }
            if let Ok(decoded) =
                <GetAllFunctionsCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetAllFunctions(decoded));
            }
            if let Ok(decoded) =
                <GetAttestationQueueMrEnclavesCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetAttestationQueueMrEnclaves(decoded));
            }
            if let Ok(decoded) =
                <GetCurrentIntervalIdCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetCurrentIntervalId(decoded));
            }
            if let Ok(decoded) = <GetEnclaveIdxCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetEnclaveIdx(decoded));
            }
            if let Ok(decoded) = <GetEnclavesCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::GetEnclaves(decoded));
            }
            if let Ok(decoded) =
                <GetFunctionsByAuthorityCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetFunctionsByAuthority(decoded));
            }
            if let Ok(decoded) =
                <GetIntervalResultCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetIntervalResult(decoded));
            }
            if let Ok(decoded) = <GetOracleIdxCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetOracleIdx(decoded));
            }
            if let Ok(decoded) =
                <GetOracleQueueAllowedMrEnclavesCall as ::ethers::core::abi::AbiDecode>::decode(
                    data,
                )
            {
                return Ok(Self::GetOracleQueueAllowedMrEnclaves(decoded));
            }
            if let Ok(decoded) = <GetOraclesCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::GetOracles(decoded));
            }
            if let Ok(decoded) = <GetPermissionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetPermission(decoded));
            }
            if let Ok(decoded) =
                <GetTransactionHashCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::GetTransactionHash(decoded));
            }
            if let Ok(decoded) = <HasPermissionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::HasPermission(decoded));
            }
            if let Ok(decoded) = <InitCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Init(decoded));
            }
            if let Ok(decoded) = <InitializeCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Initialize(decoded));
            }
            if let Ok(decoded) = <IsAdminCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::IsAdmin(decoded));
            }
            if let Ok(decoded) = <IsAllowedCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::IsAllowed(decoded));
            }
            if let Ok(decoded) =
                <IsEnclaveValidCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::IsEnclaveValid(decoded));
            }
            if let Ok(decoded) =
                <IsTrustedForwarderCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::IsTrustedForwarder(decoded));
            }
            if let Ok(decoded) = <LatestResultCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::LatestResult(decoded));
            }
            if let Ok(decoded) = <OpenIntervalCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OpenInterval(decoded));
            }
            if let Ok(decoded) =
                <OracleGarbageCollectCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleGarbageCollect(decoded));
            }
            if let Ok(decoded) =
                <OracleHeartbeatCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleHeartbeat(decoded));
            }
            if let Ok(decoded) = <OracleQueuesCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::OracleQueues(decoded));
            }
            if let Ok(decoded) = <OraclesCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Oracles(decoded));
            }
            if let Ok(decoded) = <OwnerCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Owner(decoded));
            }
            if let Ok(decoded) =
                <QueueAttestationConfigsCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::QueueAttestationConfigs(decoded));
            }
            if let Ok(decoded) = <RandomValueCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::RandomValue(decoded));
            }
            if let Ok(decoded) =
                <RemoveMrEnclaveFromAttestationQueueCall as ::ethers::core::abi::AbiDecode>::decode(
                    data,
                )
            {
                return Ok(Self::RemoveMrEnclaveFromAttestationQueue(decoded));
            }
            if let Ok(decoded) =
                <RemoveMrEnclaveFromOracleQueueCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::RemoveMrEnclaveFromOracleQueue(decoded));
            }
            if let Ok(decoded) =
                <RotateEnclaveAuthorityCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::RotateEnclaveAuthority(decoded));
            }
            if let Ok(decoded) =
                <RotateOracleAuthorityCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::RotateOracleAuthority(decoded));
            }
            if let Ok(decoded) = <SaveResultsCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::SaveResults(decoded));
            }
            if let Ok(decoded) = <SetAdminCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::SetAdmin(decoded));
            }
            if let Ok(decoded) =
                <SetAggregatorConfigCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetAggregatorConfig(decoded));
            }
            if let Ok(decoded) = <SetAllowedCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::SetAllowed(decoded));
            }
            if let Ok(decoded) =
                <SetAttestationQueueConfigCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetAttestationQueueConfig(decoded));
            }
            if let Ok(decoded) =
                <SetAttestationQueuePermissionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetAttestationQueuePermission(decoded));
            }
            if let Ok(decoded) =
                <SetFunctionConfigCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetFunctionConfig(decoded));
            }
            if let Ok(decoded) =
                <SetOracleConfigCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetOracleConfig(decoded));
            }
            if let Ok(decoded) =
                <SetOracleQueueAttestationConfigCall as ::ethers::core::abi::AbiDecode>::decode(
                    data,
                )
            {
                return Ok(Self::SetOracleQueueAttestationConfig(decoded));
            }
            if let Ok(decoded) =
                <SetOracleQueueConfigCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetOracleQueueConfig(decoded));
            }
            if let Ok(decoded) =
                <SetOracleQueuePermissionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SetOracleQueuePermission(decoded));
            }
            if let Ok(decoded) =
                <SetToleratedTimestampDiscrepancyCall as ::ethers::core::abi::AbiDecode>::decode(
                    data,
                )
            {
                return Ok(Self::SetToleratedTimestampDiscrepancy(decoded));
            }
            if let Ok(decoded) =
                <SupportsInterfaceCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::SupportsInterface(decoded));
            }
            if let Ok(decoded) =
                <TransferOwnershipCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::TransferOwnership(decoded));
            }
            if let Ok(decoded) = <UpdateEnclaveCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::UpdateEnclave(decoded));
            }
            if let Ok(decoded) = <ValidateCall as ::ethers::core::abi::AbiDecode>::decode(data) {
                return Ok(Self::Validate(decoded));
            }
            if let Ok(decoded) = <VerifyEnclaveCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::VerifyEnclave(decoded));
            }
            if let Ok(decoded) =
                <VerifyFunctionCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::VerifyFunction(decoded));
            }
            if let Ok(decoded) =
                <ViewAggregatorResultsCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ViewAggregatorResults(decoded));
            }
            if let Ok(decoded) =
                <ViewLatestResultCall as ::ethers::core::abi::AbiDecode>::decode(data)
            {
                return Ok(Self::ViewLatestResult(decoded));
            }
            Err(::ethers::core::abi::Error::InvalidData.into())
        }
    }
    impl ::ethers::core::abi::AbiEncode for SwitchboardCalls {
        fn encode(self) -> Vec<u8> {
            match self {
                Self::AddMrEnclaveToAttestationQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AddMrEnclaveToOracleQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AggregatorEscrowFund(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AggregatorEscrowWithdraw(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AggregatorHistory(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Aggregators(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::AttestationQueueHasMrEnclave(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::AttestationQueues(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CallFunction(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Callback(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CreateAggregator(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CreateAttestationQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::CreateEnclave(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CreateEnclaveWithId(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::CreateFunction(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CreateFunctionWithId(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::CreateOracle(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CreateOracleQueue(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::CreateOracleWithId(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::DiamondCut(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::EnclaveAuthorityToEnclaveAddress(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveGarbageCollect(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::EnclaveHeartbeat(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Enclaves(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::FacetAddress(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::FacetAddresses(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::FacetFunctionSelectors(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::Facets(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::FailEnclave(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::ForceOverrideVerify(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::Forward(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Funcs(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::FunctionEscrowFund(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionEscrowWithdraw(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::FunctionExists(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetActiveFunctionCallsByQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetActiveFunctionsByQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetAggregatorsByAuthority(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetAllAggregators(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetAllFunctions(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetAttestationQueueMrEnclaves(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetCurrentIntervalId(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetEnclaveIdx(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetEnclaves(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetFunctionsByAuthority(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetIntervalResult(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetOracleIdx(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetOracleQueueAllowedMrEnclaves(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::GetOracles(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetPermission(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::GetTransactionHash(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::HasPermission(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Init(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Initialize(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::IsAdmin(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::IsAllowed(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::IsEnclaveValid(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::IsTrustedForwarder(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::LatestResult(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::OpenInterval(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::OracleGarbageCollect(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::OracleHeartbeat(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::OracleQueues(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Oracles(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Owner(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::QueueAttestationConfigs(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::RandomValue(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::RemoveMrEnclaveFromAttestationQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::RemoveMrEnclaveFromOracleQueue(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::RotateEnclaveAuthority(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::RotateOracleAuthority(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SaveResults(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::SetAdmin(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::SetAggregatorConfig(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SetAllowed(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::SetAttestationQueueConfig(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SetAttestationQueuePermission(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SetFunctionConfig(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::SetOracleConfig(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::SetOracleQueueAttestationConfig(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SetOracleQueueConfig(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SetOracleQueuePermission(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SetToleratedTimestampDiscrepancy(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::SupportsInterface(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::TransferOwnership(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::UpdateEnclave(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::Validate(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::VerifyEnclave(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::VerifyFunction(element) => ::ethers::core::abi::AbiEncode::encode(element),
                Self::ViewAggregatorResults(element) => {
                    ::ethers::core::abi::AbiEncode::encode(element)
                }
                Self::ViewLatestResult(element) => ::ethers::core::abi::AbiEncode::encode(element),
            }
        }
    }
    impl ::core::fmt::Display for SwitchboardCalls {
        fn fmt(&self, f: &mut ::core::fmt::Formatter<'_>) -> ::core::fmt::Result {
            match self {
                Self::AddMrEnclaveToAttestationQueue(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AddMrEnclaveToOracleQueue(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorEscrowFund(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorEscrowWithdraw(element) => ::core::fmt::Display::fmt(element, f),
                Self::AggregatorHistory(element) => ::core::fmt::Display::fmt(element, f),
                Self::Aggregators(element) => ::core::fmt::Display::fmt(element, f),
                Self::AttestationQueueHasMrEnclave(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::AttestationQueues(element) => ::core::fmt::Display::fmt(element, f),
                Self::CallFunction(element) => ::core::fmt::Display::fmt(element, f),
                Self::Callback(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateAggregator(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateAttestationQueue(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateEnclave(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateEnclaveWithId(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateFunction(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateFunctionWithId(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateOracle(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateOracleQueue(element) => ::core::fmt::Display::fmt(element, f),
                Self::CreateOracleWithId(element) => ::core::fmt::Display::fmt(element, f),
                Self::DiamondCut(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveAuthorityToEnclaveAddress(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::EnclaveGarbageCollect(element) => ::core::fmt::Display::fmt(element, f),
                Self::EnclaveHeartbeat(element) => ::core::fmt::Display::fmt(element, f),
                Self::Enclaves(element) => ::core::fmt::Display::fmt(element, f),
                Self::FacetAddress(element) => ::core::fmt::Display::fmt(element, f),
                Self::FacetAddresses(element) => ::core::fmt::Display::fmt(element, f),
                Self::FacetFunctionSelectors(element) => ::core::fmt::Display::fmt(element, f),
                Self::Facets(element) => ::core::fmt::Display::fmt(element, f),
                Self::FailEnclave(element) => ::core::fmt::Display::fmt(element, f),
                Self::ForceOverrideVerify(element) => ::core::fmt::Display::fmt(element, f),
                Self::Forward(element) => ::core::fmt::Display::fmt(element, f),
                Self::Funcs(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionEscrowFund(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionEscrowWithdraw(element) => ::core::fmt::Display::fmt(element, f),
                Self::FunctionExists(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetActiveFunctionCallsByQueue(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::GetActiveFunctionsByQueue(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetAggregatorsByAuthority(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetAllAggregators(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetAllFunctions(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetAttestationQueueMrEnclaves(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::GetCurrentIntervalId(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetEnclaveIdx(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetEnclaves(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetFunctionsByAuthority(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetIntervalResult(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetOracleIdx(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetOracleQueueAllowedMrEnclaves(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::GetOracles(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetPermission(element) => ::core::fmt::Display::fmt(element, f),
                Self::GetTransactionHash(element) => ::core::fmt::Display::fmt(element, f),
                Self::HasPermission(element) => ::core::fmt::Display::fmt(element, f),
                Self::Init(element) => ::core::fmt::Display::fmt(element, f),
                Self::Initialize(element) => ::core::fmt::Display::fmt(element, f),
                Self::IsAdmin(element) => ::core::fmt::Display::fmt(element, f),
                Self::IsAllowed(element) => ::core::fmt::Display::fmt(element, f),
                Self::IsEnclaveValid(element) => ::core::fmt::Display::fmt(element, f),
                Self::IsTrustedForwarder(element) => ::core::fmt::Display::fmt(element, f),
                Self::LatestResult(element) => ::core::fmt::Display::fmt(element, f),
                Self::OpenInterval(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleGarbageCollect(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleHeartbeat(element) => ::core::fmt::Display::fmt(element, f),
                Self::OracleQueues(element) => ::core::fmt::Display::fmt(element, f),
                Self::Oracles(element) => ::core::fmt::Display::fmt(element, f),
                Self::Owner(element) => ::core::fmt::Display::fmt(element, f),
                Self::QueueAttestationConfigs(element) => ::core::fmt::Display::fmt(element, f),
                Self::RandomValue(element) => ::core::fmt::Display::fmt(element, f),
                Self::RemoveMrEnclaveFromAttestationQueue(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::RemoveMrEnclaveFromOracleQueue(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::RotateEnclaveAuthority(element) => ::core::fmt::Display::fmt(element, f),
                Self::RotateOracleAuthority(element) => ::core::fmt::Display::fmt(element, f),
                Self::SaveResults(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetAdmin(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetAggregatorConfig(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetAllowed(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetAttestationQueueConfig(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetAttestationQueuePermission(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::SetFunctionConfig(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetOracleConfig(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetOracleQueueAttestationConfig(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::SetOracleQueueConfig(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetOracleQueuePermission(element) => ::core::fmt::Display::fmt(element, f),
                Self::SetToleratedTimestampDiscrepancy(element) => {
                    ::core::fmt::Display::fmt(element, f)
                }
                Self::SupportsInterface(element) => ::core::fmt::Display::fmt(element, f),
                Self::TransferOwnership(element) => ::core::fmt::Display::fmt(element, f),
                Self::UpdateEnclave(element) => ::core::fmt::Display::fmt(element, f),
                Self::Validate(element) => ::core::fmt::Display::fmt(element, f),
                Self::VerifyEnclave(element) => ::core::fmt::Display::fmt(element, f),
                Self::VerifyFunction(element) => ::core::fmt::Display::fmt(element, f),
                Self::ViewAggregatorResults(element) => ::core::fmt::Display::fmt(element, f),
                Self::ViewLatestResult(element) => ::core::fmt::Display::fmt(element, f),
            }
        }
    }
    impl ::core::convert::From<AddMrEnclaveToAttestationQueueCall> for SwitchboardCalls {
        fn from(value: AddMrEnclaveToAttestationQueueCall) -> Self {
            Self::AddMrEnclaveToAttestationQueue(value)
        }
    }
    impl ::core::convert::From<AddMrEnclaveToOracleQueueCall> for SwitchboardCalls {
        fn from(value: AddMrEnclaveToOracleQueueCall) -> Self {
            Self::AddMrEnclaveToOracleQueue(value)
        }
    }
    impl ::core::convert::From<AggregatorEscrowFundCall> for SwitchboardCalls {
        fn from(value: AggregatorEscrowFundCall) -> Self {
            Self::AggregatorEscrowFund(value)
        }
    }
    impl ::core::convert::From<AggregatorEscrowWithdrawCall> for SwitchboardCalls {
        fn from(value: AggregatorEscrowWithdrawCall) -> Self {
            Self::AggregatorEscrowWithdraw(value)
        }
    }
    impl ::core::convert::From<AggregatorHistoryCall> for SwitchboardCalls {
        fn from(value: AggregatorHistoryCall) -> Self {
            Self::AggregatorHistory(value)
        }
    }
    impl ::core::convert::From<AggregatorsCall> for SwitchboardCalls {
        fn from(value: AggregatorsCall) -> Self {
            Self::Aggregators(value)
        }
    }
    impl ::core::convert::From<AttestationQueueHasMrEnclaveCall> for SwitchboardCalls {
        fn from(value: AttestationQueueHasMrEnclaveCall) -> Self {
            Self::AttestationQueueHasMrEnclave(value)
        }
    }
    impl ::core::convert::From<AttestationQueuesCall> for SwitchboardCalls {
        fn from(value: AttestationQueuesCall) -> Self {
            Self::AttestationQueues(value)
        }
    }
    impl ::core::convert::From<CallFunctionCall> for SwitchboardCalls {
        fn from(value: CallFunctionCall) -> Self {
            Self::CallFunction(value)
        }
    }
    impl ::core::convert::From<CallbackCall> for SwitchboardCalls {
        fn from(value: CallbackCall) -> Self {
            Self::Callback(value)
        }
    }
    impl ::core::convert::From<CreateAggregatorCall> for SwitchboardCalls {
        fn from(value: CreateAggregatorCall) -> Self {
            Self::CreateAggregator(value)
        }
    }
    impl ::core::convert::From<CreateAttestationQueueCall> for SwitchboardCalls {
        fn from(value: CreateAttestationQueueCall) -> Self {
            Self::CreateAttestationQueue(value)
        }
    }
    impl ::core::convert::From<CreateEnclaveCall> for SwitchboardCalls {
        fn from(value: CreateEnclaveCall) -> Self {
            Self::CreateEnclave(value)
        }
    }
    impl ::core::convert::From<CreateEnclaveWithIdCall> for SwitchboardCalls {
        fn from(value: CreateEnclaveWithIdCall) -> Self {
            Self::CreateEnclaveWithId(value)
        }
    }
    impl ::core::convert::From<CreateFunctionCall> for SwitchboardCalls {
        fn from(value: CreateFunctionCall) -> Self {
            Self::CreateFunction(value)
        }
    }
    impl ::core::convert::From<CreateFunctionWithIdCall> for SwitchboardCalls {
        fn from(value: CreateFunctionWithIdCall) -> Self {
            Self::CreateFunctionWithId(value)
        }
    }
    impl ::core::convert::From<CreateOracleCall> for SwitchboardCalls {
        fn from(value: CreateOracleCall) -> Self {
            Self::CreateOracle(value)
        }
    }
    impl ::core::convert::From<CreateOracleQueueCall> for SwitchboardCalls {
        fn from(value: CreateOracleQueueCall) -> Self {
            Self::CreateOracleQueue(value)
        }
    }
    impl ::core::convert::From<CreateOracleWithIdCall> for SwitchboardCalls {
        fn from(value: CreateOracleWithIdCall) -> Self {
            Self::CreateOracleWithId(value)
        }
    }
    impl ::core::convert::From<DiamondCutCall> for SwitchboardCalls {
        fn from(value: DiamondCutCall) -> Self {
            Self::DiamondCut(value)
        }
    }
    impl ::core::convert::From<EnclaveAuthorityToEnclaveAddressCall> for SwitchboardCalls {
        fn from(value: EnclaveAuthorityToEnclaveAddressCall) -> Self {
            Self::EnclaveAuthorityToEnclaveAddress(value)
        }
    }
    impl ::core::convert::From<EnclaveGarbageCollectCall> for SwitchboardCalls {
        fn from(value: EnclaveGarbageCollectCall) -> Self {
            Self::EnclaveGarbageCollect(value)
        }
    }
    impl ::core::convert::From<EnclaveHeartbeatCall> for SwitchboardCalls {
        fn from(value: EnclaveHeartbeatCall) -> Self {
            Self::EnclaveHeartbeat(value)
        }
    }
    impl ::core::convert::From<EnclavesCall> for SwitchboardCalls {
        fn from(value: EnclavesCall) -> Self {
            Self::Enclaves(value)
        }
    }
    impl ::core::convert::From<FacetAddressCall> for SwitchboardCalls {
        fn from(value: FacetAddressCall) -> Self {
            Self::FacetAddress(value)
        }
    }
    impl ::core::convert::From<FacetAddressesCall> for SwitchboardCalls {
        fn from(value: FacetAddressesCall) -> Self {
            Self::FacetAddresses(value)
        }
    }
    impl ::core::convert::From<FacetFunctionSelectorsCall> for SwitchboardCalls {
        fn from(value: FacetFunctionSelectorsCall) -> Self {
            Self::FacetFunctionSelectors(value)
        }
    }
    impl ::core::convert::From<FacetsCall> for SwitchboardCalls {
        fn from(value: FacetsCall) -> Self {
            Self::Facets(value)
        }
    }
    impl ::core::convert::From<FailEnclaveCall> for SwitchboardCalls {
        fn from(value: FailEnclaveCall) -> Self {
            Self::FailEnclave(value)
        }
    }
    impl ::core::convert::From<ForceOverrideVerifyCall> for SwitchboardCalls {
        fn from(value: ForceOverrideVerifyCall) -> Self {
            Self::ForceOverrideVerify(value)
        }
    }
    impl ::core::convert::From<ForwardCall> for SwitchboardCalls {
        fn from(value: ForwardCall) -> Self {
            Self::Forward(value)
        }
    }
    impl ::core::convert::From<FuncsCall> for SwitchboardCalls {
        fn from(value: FuncsCall) -> Self {
            Self::Funcs(value)
        }
    }
    impl ::core::convert::From<FunctionEscrowFundCall> for SwitchboardCalls {
        fn from(value: FunctionEscrowFundCall) -> Self {
            Self::FunctionEscrowFund(value)
        }
    }
    impl ::core::convert::From<FunctionEscrowWithdrawCall> for SwitchboardCalls {
        fn from(value: FunctionEscrowWithdrawCall) -> Self {
            Self::FunctionEscrowWithdraw(value)
        }
    }
    impl ::core::convert::From<FunctionExistsCall> for SwitchboardCalls {
        fn from(value: FunctionExistsCall) -> Self {
            Self::FunctionExists(value)
        }
    }
    impl ::core::convert::From<GetActiveFunctionCallsByQueueCall> for SwitchboardCalls {
        fn from(value: GetActiveFunctionCallsByQueueCall) -> Self {
            Self::GetActiveFunctionCallsByQueue(value)
        }
    }
    impl ::core::convert::From<GetActiveFunctionsByQueueCall> for SwitchboardCalls {
        fn from(value: GetActiveFunctionsByQueueCall) -> Self {
            Self::GetActiveFunctionsByQueue(value)
        }
    }
    impl ::core::convert::From<GetAggregatorsByAuthorityCall> for SwitchboardCalls {
        fn from(value: GetAggregatorsByAuthorityCall) -> Self {
            Self::GetAggregatorsByAuthority(value)
        }
    }
    impl ::core::convert::From<GetAllAggregatorsCall> for SwitchboardCalls {
        fn from(value: GetAllAggregatorsCall) -> Self {
            Self::GetAllAggregators(value)
        }
    }
    impl ::core::convert::From<GetAllFunctionsCall> for SwitchboardCalls {
        fn from(value: GetAllFunctionsCall) -> Self {
            Self::GetAllFunctions(value)
        }
    }
    impl ::core::convert::From<GetAttestationQueueMrEnclavesCall> for SwitchboardCalls {
        fn from(value: GetAttestationQueueMrEnclavesCall) -> Self {
            Self::GetAttestationQueueMrEnclaves(value)
        }
    }
    impl ::core::convert::From<GetCurrentIntervalIdCall> for SwitchboardCalls {
        fn from(value: GetCurrentIntervalIdCall) -> Self {
            Self::GetCurrentIntervalId(value)
        }
    }
    impl ::core::convert::From<GetEnclaveIdxCall> for SwitchboardCalls {
        fn from(value: GetEnclaveIdxCall) -> Self {
            Self::GetEnclaveIdx(value)
        }
    }
    impl ::core::convert::From<GetEnclavesCall> for SwitchboardCalls {
        fn from(value: GetEnclavesCall) -> Self {
            Self::GetEnclaves(value)
        }
    }
    impl ::core::convert::From<GetFunctionsByAuthorityCall> for SwitchboardCalls {
        fn from(value: GetFunctionsByAuthorityCall) -> Self {
            Self::GetFunctionsByAuthority(value)
        }
    }
    impl ::core::convert::From<GetIntervalResultCall> for SwitchboardCalls {
        fn from(value: GetIntervalResultCall) -> Self {
            Self::GetIntervalResult(value)
        }
    }
    impl ::core::convert::From<GetOracleIdxCall> for SwitchboardCalls {
        fn from(value: GetOracleIdxCall) -> Self {
            Self::GetOracleIdx(value)
        }
    }
    impl ::core::convert::From<GetOracleQueueAllowedMrEnclavesCall> for SwitchboardCalls {
        fn from(value: GetOracleQueueAllowedMrEnclavesCall) -> Self {
            Self::GetOracleQueueAllowedMrEnclaves(value)
        }
    }
    impl ::core::convert::From<GetOraclesCall> for SwitchboardCalls {
        fn from(value: GetOraclesCall) -> Self {
            Self::GetOracles(value)
        }
    }
    impl ::core::convert::From<GetPermissionCall> for SwitchboardCalls {
        fn from(value: GetPermissionCall) -> Self {
            Self::GetPermission(value)
        }
    }
    impl ::core::convert::From<GetTransactionHashCall> for SwitchboardCalls {
        fn from(value: GetTransactionHashCall) -> Self {
            Self::GetTransactionHash(value)
        }
    }
    impl ::core::convert::From<HasPermissionCall> for SwitchboardCalls {
        fn from(value: HasPermissionCall) -> Self {
            Self::HasPermission(value)
        }
    }
    impl ::core::convert::From<InitCall> for SwitchboardCalls {
        fn from(value: InitCall) -> Self {
            Self::Init(value)
        }
    }
    impl ::core::convert::From<InitializeCall> for SwitchboardCalls {
        fn from(value: InitializeCall) -> Self {
            Self::Initialize(value)
        }
    }
    impl ::core::convert::From<IsAdminCall> for SwitchboardCalls {
        fn from(value: IsAdminCall) -> Self {
            Self::IsAdmin(value)
        }
    }
    impl ::core::convert::From<IsAllowedCall> for SwitchboardCalls {
        fn from(value: IsAllowedCall) -> Self {
            Self::IsAllowed(value)
        }
    }
    impl ::core::convert::From<IsEnclaveValidCall> for SwitchboardCalls {
        fn from(value: IsEnclaveValidCall) -> Self {
            Self::IsEnclaveValid(value)
        }
    }
    impl ::core::convert::From<IsTrustedForwarderCall> for SwitchboardCalls {
        fn from(value: IsTrustedForwarderCall) -> Self {
            Self::IsTrustedForwarder(value)
        }
    }
    impl ::core::convert::From<LatestResultCall> for SwitchboardCalls {
        fn from(value: LatestResultCall) -> Self {
            Self::LatestResult(value)
        }
    }
    impl ::core::convert::From<OpenIntervalCall> for SwitchboardCalls {
        fn from(value: OpenIntervalCall) -> Self {
            Self::OpenInterval(value)
        }
    }
    impl ::core::convert::From<OracleGarbageCollectCall> for SwitchboardCalls {
        fn from(value: OracleGarbageCollectCall) -> Self {
            Self::OracleGarbageCollect(value)
        }
    }
    impl ::core::convert::From<OracleHeartbeatCall> for SwitchboardCalls {
        fn from(value: OracleHeartbeatCall) -> Self {
            Self::OracleHeartbeat(value)
        }
    }
    impl ::core::convert::From<OracleQueuesCall> for SwitchboardCalls {
        fn from(value: OracleQueuesCall) -> Self {
            Self::OracleQueues(value)
        }
    }
    impl ::core::convert::From<OraclesCall> for SwitchboardCalls {
        fn from(value: OraclesCall) -> Self {
            Self::Oracles(value)
        }
    }
    impl ::core::convert::From<OwnerCall> for SwitchboardCalls {
        fn from(value: OwnerCall) -> Self {
            Self::Owner(value)
        }
    }
    impl ::core::convert::From<QueueAttestationConfigsCall> for SwitchboardCalls {
        fn from(value: QueueAttestationConfigsCall) -> Self {
            Self::QueueAttestationConfigs(value)
        }
    }
    impl ::core::convert::From<RandomValueCall> for SwitchboardCalls {
        fn from(value: RandomValueCall) -> Self {
            Self::RandomValue(value)
        }
    }
    impl ::core::convert::From<RemoveMrEnclaveFromAttestationQueueCall> for SwitchboardCalls {
        fn from(value: RemoveMrEnclaveFromAttestationQueueCall) -> Self {
            Self::RemoveMrEnclaveFromAttestationQueue(value)
        }
    }
    impl ::core::convert::From<RemoveMrEnclaveFromOracleQueueCall> for SwitchboardCalls {
        fn from(value: RemoveMrEnclaveFromOracleQueueCall) -> Self {
            Self::RemoveMrEnclaveFromOracleQueue(value)
        }
    }
    impl ::core::convert::From<RotateEnclaveAuthorityCall> for SwitchboardCalls {
        fn from(value: RotateEnclaveAuthorityCall) -> Self {
            Self::RotateEnclaveAuthority(value)
        }
    }
    impl ::core::convert::From<RotateOracleAuthorityCall> for SwitchboardCalls {
        fn from(value: RotateOracleAuthorityCall) -> Self {
            Self::RotateOracleAuthority(value)
        }
    }
    impl ::core::convert::From<SaveResultsCall> for SwitchboardCalls {
        fn from(value: SaveResultsCall) -> Self {
            Self::SaveResults(value)
        }
    }
    impl ::core::convert::From<SetAdminCall> for SwitchboardCalls {
        fn from(value: SetAdminCall) -> Self {
            Self::SetAdmin(value)
        }
    }
    impl ::core::convert::From<SetAggregatorConfigCall> for SwitchboardCalls {
        fn from(value: SetAggregatorConfigCall) -> Self {
            Self::SetAggregatorConfig(value)
        }
    }
    impl ::core::convert::From<SetAllowedCall> for SwitchboardCalls {
        fn from(value: SetAllowedCall) -> Self {
            Self::SetAllowed(value)
        }
    }
    impl ::core::convert::From<SetAttestationQueueConfigCall> for SwitchboardCalls {
        fn from(value: SetAttestationQueueConfigCall) -> Self {
            Self::SetAttestationQueueConfig(value)
        }
    }
    impl ::core::convert::From<SetAttestationQueuePermissionCall> for SwitchboardCalls {
        fn from(value: SetAttestationQueuePermissionCall) -> Self {
            Self::SetAttestationQueuePermission(value)
        }
    }
    impl ::core::convert::From<SetFunctionConfigCall> for SwitchboardCalls {
        fn from(value: SetFunctionConfigCall) -> Self {
            Self::SetFunctionConfig(value)
        }
    }
    impl ::core::convert::From<SetOracleConfigCall> for SwitchboardCalls {
        fn from(value: SetOracleConfigCall) -> Self {
            Self::SetOracleConfig(value)
        }
    }
    impl ::core::convert::From<SetOracleQueueAttestationConfigCall> for SwitchboardCalls {
        fn from(value: SetOracleQueueAttestationConfigCall) -> Self {
            Self::SetOracleQueueAttestationConfig(value)
        }
    }
    impl ::core::convert::From<SetOracleQueueConfigCall> for SwitchboardCalls {
        fn from(value: SetOracleQueueConfigCall) -> Self {
            Self::SetOracleQueueConfig(value)
        }
    }
    impl ::core::convert::From<SetOracleQueuePermissionCall> for SwitchboardCalls {
        fn from(value: SetOracleQueuePermissionCall) -> Self {
            Self::SetOracleQueuePermission(value)
        }
    }
    impl ::core::convert::From<SetToleratedTimestampDiscrepancyCall> for SwitchboardCalls {
        fn from(value: SetToleratedTimestampDiscrepancyCall) -> Self {
            Self::SetToleratedTimestampDiscrepancy(value)
        }
    }
    impl ::core::convert::From<SupportsInterfaceCall> for SwitchboardCalls {
        fn from(value: SupportsInterfaceCall) -> Self {
            Self::SupportsInterface(value)
        }
    }
    impl ::core::convert::From<TransferOwnershipCall> for SwitchboardCalls {
        fn from(value: TransferOwnershipCall) -> Self {
            Self::TransferOwnership(value)
        }
    }
    impl ::core::convert::From<UpdateEnclaveCall> for SwitchboardCalls {
        fn from(value: UpdateEnclaveCall) -> Self {
            Self::UpdateEnclave(value)
        }
    }
    impl ::core::convert::From<ValidateCall> for SwitchboardCalls {
        fn from(value: ValidateCall) -> Self {
            Self::Validate(value)
        }
    }
    impl ::core::convert::From<VerifyEnclaveCall> for SwitchboardCalls {
        fn from(value: VerifyEnclaveCall) -> Self {
            Self::VerifyEnclave(value)
        }
    }
    impl ::core::convert::From<VerifyFunctionCall> for SwitchboardCalls {
        fn from(value: VerifyFunctionCall) -> Self {
            Self::VerifyFunction(value)
        }
    }
    impl ::core::convert::From<ViewAggregatorResultsCall> for SwitchboardCalls {
        fn from(value: ViewAggregatorResultsCall) -> Self {
            Self::ViewAggregatorResults(value)
        }
    }
    impl ::core::convert::From<ViewLatestResultCall> for SwitchboardCalls {
        fn from(value: ViewLatestResultCall) -> Self {
            Self::ViewLatestResult(value)
        }
    }
    ///Container type for all return fields from the `aggregatorHistory` function with signature `aggregatorHistory(address,uint80)` and selector `0x8625bd08`
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
    pub struct AggregatorHistoryReturn(pub AggregatorHistoryResult);
    ///Container type for all return fields from the `aggregators` function with signature `aggregators(address)` and selector `0x112cdab9`
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
    pub struct AggregatorsReturn(pub Aggregator);
    ///Container type for all return fields from the `attestationQueueHasMrEnclave` function with signature `attestationQueueHasMrEnclave(address,bytes32)` and selector `0x63fcd771`
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
    pub struct AttestationQueueHasMrEnclaveReturn(pub bool);
    ///Container type for all return fields from the `attestationQueues` function with signature `attestationQueues(address)` and selector `0x8bb3048c`
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
    pub struct AttestationQueuesReturn(pub AttestationQueue);
    ///Container type for all return fields from the `enclaveAuthorityToEnclaveAddress` function with signature `enclaveAuthorityToEnclaveAddress(address)` and selector `0x5a6fe378`
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
    pub struct EnclaveAuthorityToEnclaveAddressReturn(pub ::ethers::core::types::Address);
    ///Container type for all return fields from the `enclaves` function with signature `enclaves(address)` and selector `0xfaeedb07`
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
    pub struct EnclavesReturn(pub Enclave);
    ///Container type for all return fields from the `facetAddress` function with signature `facetAddress(bytes4)` and selector `0xcdffacc6`
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
    pub struct FacetAddressReturn {
        pub facet_address: ::ethers::core::types::Address,
    }
    ///Container type for all return fields from the `facetAddresses` function with signature `facetAddresses()` and selector `0x52ef6b2c`
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
    pub struct FacetAddressesReturn {
        pub facet_addresses: ::std::vec::Vec<::ethers::core::types::Address>,
    }
    ///Container type for all return fields from the `facetFunctionSelectors` function with signature `facetFunctionSelectors(address)` and selector `0xadfca15e`
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
    pub struct FacetFunctionSelectorsReturn {
        pub facet_function_selectors: ::std::vec::Vec<[u8; 4]>,
    }
    ///Container type for all return fields from the `facets` function with signature `facets()` and selector `0x7a0ed627`
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
    pub struct FacetsReturn {
        pub facets: ::std::vec::Vec<Facet>,
    }
    ///Container type for all return fields from the `funcs` function with signature `funcs(address)` and selector `0x8ef92003`
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
    pub struct FuncsReturn(pub SbFunction);
    ///Container type for all return fields from the `functionExists` function with signature `functionExists(address)` and selector `0xa13001c9`
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
    pub struct FunctionExistsReturn(pub bool);
    ///Container type for all return fields from the `getActiveFunctionCallsByQueue` function with signature `getActiveFunctionCallsByQueue(address)` and selector `0xfa88c651`
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
    pub struct GetActiveFunctionCallsByQueueReturn(
        pub ::std::vec::Vec<::ethers::core::types::Address>,
        pub ::std::vec::Vec<FunctionCall>,
    );
    ///Container type for all return fields from the `getActiveFunctionsByQueue` function with signature `getActiveFunctionsByQueue(address)` and selector `0x1fc747b7`
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
    pub struct GetActiveFunctionsByQueueReturn(
        pub ::std::vec::Vec<::ethers::core::types::Address>,
        pub ::std::vec::Vec<SbFunction>,
    );
    ///Container type for all return fields from the `getAggregatorsByAuthority` function with signature `getAggregatorsByAuthority(address)` and selector `0x911c30f3`
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
    pub struct GetAggregatorsByAuthorityReturn(
        pub ::std::vec::Vec<::ethers::core::types::Address>,
        pub ::std::vec::Vec<Aggregator>,
    );
    ///Container type for all return fields from the `getAllAggregators` function with signature `getAllAggregators()` and selector `0x465c65dd`
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
    pub struct GetAllAggregatorsReturn(
        pub ::std::vec::Vec<::ethers::core::types::Address>,
        pub ::std::vec::Vec<Aggregator>,
    );
    ///Container type for all return fields from the `getAllFunctions` function with signature `getAllFunctions()` and selector `0xab6418b4`
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
    pub struct GetAllFunctionsReturn(
        pub ::std::vec::Vec<::ethers::core::types::Address>,
        pub ::std::vec::Vec<SbFunction>,
    );
    ///Container type for all return fields from the `getAttestationQueueMrEnclaves` function with signature `getAttestationQueueMrEnclaves(address)` and selector `0x0f3bc418`
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
    pub struct GetAttestationQueueMrEnclavesReturn(pub ::std::vec::Vec<[u8; 32]>);
    ///Container type for all return fields from the `getCurrentIntervalId` function with signature `getCurrentIntervalId(address)` and selector `0x1dc1da86`
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
    pub struct GetCurrentIntervalIdReturn {
        pub round_id: u128,
    }
    ///Container type for all return fields from the `getEnclaveIdx` function with signature `getEnclaveIdx(address)` and selector `0x21fb3bbc`
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
    pub struct GetEnclaveIdxReturn(pub ::ethers::core::types::I256);
    ///Container type for all return fields from the `getEnclaves` function with signature `getEnclaves(address)` and selector `0x340dd88b`
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
    pub struct GetEnclavesReturn(pub ::std::vec::Vec<::ethers::core::types::Address>);
    ///Container type for all return fields from the `getFunctionsByAuthority` function with signature `getFunctionsByAuthority(address)` and selector `0x357f633f`
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
    pub struct GetFunctionsByAuthorityReturn(
        pub ::std::vec::Vec<::ethers::core::types::Address>,
        pub ::std::vec::Vec<SbFunction>,
    );
    ///Container type for all return fields from the `getIntervalResult` function with signature `getIntervalResult(address,uint80)` and selector `0x3d24ef6e`
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
    pub struct GetIntervalResultReturn {
        pub value: ::ethers::core::types::I256,
        pub timestamp: ::ethers::core::types::U256,
        pub median_timestamp: ::ethers::core::types::U256,
    }
    ///Container type for all return fields from the `getOracleIdx` function with signature `getOracleIdx(address)` and selector `0xd87dd0ac`
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
    pub struct GetOracleIdxReturn(pub ::ethers::core::types::I256);
    ///Container type for all return fields from the `getOracleQueueAllowedMrEnclaves` function with signature `getOracleQueueAllowedMrEnclaves(address)` and selector `0xf04b0f59`
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
    pub struct GetOracleQueueAllowedMrEnclavesReturn(pub ::std::vec::Vec<[u8; 32]>);
    ///Container type for all return fields from the `getOracles` function with signature `getOracles(address)` and selector `0x8e749281`
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
    pub struct GetOraclesReturn(pub ::std::vec::Vec<::ethers::core::types::Address>);
    ///Container type for all return fields from the `getPermission` function with signature `getPermission(address,address)` and selector `0x910185dd`
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
    pub struct GetPermissionReturn(pub ::ethers::core::types::U256);
    ///Container type for all return fields from the `getTransactionHash` function with signature `getTransactionHash(uint256,uint256,uint256,address,address,bytes)` and selector `0xd93f1970`
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
    pub struct GetTransactionHashReturn(pub [u8; 32]);
    ///Container type for all return fields from the `hasPermission` function with signature `hasPermission(address,address,uint256)` and selector `0x8b01813d`
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
    pub struct HasPermissionReturn(pub bool);
    ///Container type for all return fields from the `isAdmin` function with signature `isAdmin(address)` and selector `0x24d7806c`
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
    pub struct IsAdminReturn(pub bool);
    ///Container type for all return fields from the `isAllowed` function with signature `isAllowed(address)` and selector `0xbabcc539`
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
    pub struct IsAllowedReturn(pub bool);
    ///Container type for all return fields from the `isEnclaveValid` function with signature `isEnclaveValid(address)` and selector `0xfb4acdfe`
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
    pub struct IsEnclaveValidReturn(pub bool);
    ///Container type for all return fields from the `isTrustedForwarder` function with signature `isTrustedForwarder(address)` and selector `0x572b6c05`
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
    pub struct IsTrustedForwarderReturn(pub bool);
    ///Container type for all return fields from the `latestResult` function with signature `latestResult(address)` and selector `0xfab005a2`
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
    pub struct LatestResultReturn {
        pub value: ::ethers::core::types::I256,
        pub timestamp: ::ethers::core::types::U256,
    }
    ///Container type for all return fields from the `oracleQueues` function with signature `oracleQueues(address)` and selector `0xf2378e88`
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
    pub struct OracleQueuesReturn(pub OracleQueue);
    ///Container type for all return fields from the `oracles` function with signature `oracles(address)` and selector `0xaddd5099`
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
    pub struct OraclesReturn(pub Oracle);
    ///Container type for all return fields from the `owner` function with signature `owner()` and selector `0x8da5cb5b`
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
    pub struct OwnerReturn {
        pub owner: ::ethers::core::types::Address,
    }
    ///Container type for all return fields from the `queueAttestationConfigs` function with signature `queueAttestationConfigs(address)` and selector `0x6ddc9122`
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
    pub struct QueueAttestationConfigsReturn(pub AttestationConfig);
    ///Container type for all return fields from the `randomValue` function with signature `randomValue()` and selector `0x276801ec`
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
    pub struct RandomValueReturn(pub ::ethers::core::types::U256);
    ///Container type for all return fields from the `supportsInterface` function with signature `supportsInterface(bytes4)` and selector `0x01ffc9a7`
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
    pub struct SupportsInterfaceReturn(pub bool);
    ///Container type for all return fields from the `viewAggregatorResults` function with signature `viewAggregatorResults(address)` and selector `0xde866484`
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
    pub struct ViewAggregatorResultsReturn(pub ::std::vec::Vec<Result>);
    ///Container type for all return fields from the `viewLatestResult` function with signature `viewLatestResult(address)` and selector `0xbdf5edef`
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
    pub struct ViewLatestResultReturn {
        pub value: ::ethers::core::types::I256,
        pub timestamp: ::ethers::core::types::U256,
    }
    ///`Aggregator(string,address,(int256,uint256,address),(uint256,uint256,uint256,uint256,uint256,uint256),string,address,uint256,uint256,uint80,uint256,bool)`
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
    pub struct Aggregator {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub latest_result: Result,
        pub config: AggregatorConfig,
        pub jobs_hash: ::std::string::String,
        pub queue_id: ::ethers::core::types::Address,
        pub balance_left_for_interval: ::ethers::core::types::U256,
        pub next_interval_refresh_time: ::ethers::core::types::U256,
        pub interval_id: u128,
        pub balance: ::ethers::core::types::U256,
        pub history_enabled: bool,
    }
    ///`AggregatorConfig(uint256,uint256,uint256,uint256,uint256,uint256)`
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
    pub struct AggregatorConfig {
        pub batch_size: ::ethers::core::types::U256,
        pub min_update_delay_seconds: ::ethers::core::types::U256,
        pub min_oracle_results: ::ethers::core::types::U256,
        pub variance_threshold: ::ethers::core::types::U256,
        pub min_job_results: ::ethers::core::types::U256,
        pub force_report_period: ::ethers::core::types::U256,
    }
    ///`AggregatorHistoryResult(int256,uint256,uint256)`
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
    pub struct AggregatorHistoryResult {
        pub value: ::ethers::core::types::I256,
        pub timestamp: ::ethers::core::types::U256,
        pub median_timestamp: ::ethers::core::types::U256,
    }
    ///`Result(int256,uint256,address)`
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
    pub struct Result {
        pub value: ::ethers::core::types::I256,
        pub timestamp: ::ethers::core::types::U256,
        pub oracle_id: ::ethers::core::types::Address,
    }
    ///`AttestationQueue(address,address[],uint256,uint256,uint256,bytes32[],uint256,uint256,uint256,bool,bool,uint256,uint256,uint256)`
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
    pub struct AttestationQueue {
        pub authority: ::ethers::core::types::Address,
        pub data: ::std::vec::Vec<::ethers::core::types::Address>,
        pub max_size: ::ethers::core::types::U256,
        pub reward: ::ethers::core::types::U256,
        pub last_heartbeat: ::ethers::core::types::U256,
        pub mr_enclaves: ::std::vec::Vec<[u8; 32]>,
        pub max_enclave_verification_age: ::ethers::core::types::U256,
        pub allow_authority_override_after: ::ethers::core::types::U256,
        pub max_consecutive_function_failures: ::ethers::core::types::U256,
        pub require_authority_heartbeat_permission: bool,
        pub require_usage_permissions: bool,
        pub enclave_timeout: ::ethers::core::types::U256,
        pub gc_idx: ::ethers::core::types::U256,
        pub curr_idx: ::ethers::core::types::U256,
    }
    ///`Enclave(address,address,address,bytes,uint8,uint256,uint256,bytes32,bool,uint256,uint256)`
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
    pub struct Enclave {
        pub authority: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub cid: ::ethers::core::types::Bytes,
        pub verification_status: u8,
        pub verification_timestamp: ::ethers::core::types::U256,
        pub valid_until: ::ethers::core::types::U256,
        pub mr_enclave: [u8; 32],
        pub is_on_queue: bool,
        pub last_heartbeat: ::ethers::core::types::U256,
        pub balance: ::ethers::core::types::U256,
    }
    ///`FunctionCall(address,address,uint256,bytes,bool,uint256)`
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
    pub struct FunctionCall {
        pub function_id: ::ethers::core::types::Address,
        pub caller: ::ethers::core::types::Address,
        pub timestamp: ::ethers::core::types::U256,
        pub call_data: ::ethers::core::types::Bytes,
        pub executed: bool,
        pub consecutive_failures: ::ethers::core::types::U256,
    }
    ///`FunctionConfig(string,address[],string,string,string,string)`
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
    pub struct FunctionConfig {
        pub schedule: ::std::string::String,
        pub permitted_callers: ::std::vec::Vec<::ethers::core::types::Address>,
        pub container_registry: ::std::string::String,
        pub container: ::std::string::String,
        pub version: ::std::string::String,
        pub params_schema: ::std::string::String,
    }
    ///`FunctionState(uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)`
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
    pub struct FunctionState {
        pub consecutive_failures: ::ethers::core::types::U256,
        pub last_execution_timestamp: ::ethers::core::types::U256,
        pub next_allowed_timestamp: ::ethers::core::types::U256,
        pub call_id: ::ethers::core::types::U256,
        pub triggered_since: ::ethers::core::types::U256,
        pub trigger_count: ::ethers::core::types::U256,
        pub queue_idx: ::ethers::core::types::U256,
        pub triggered: bool,
    }
    ///`SbFunction(string,address,address,address,uint256,uint8,(string,address[],string,string,string,string),(uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool))`
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
    pub struct SbFunction {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub enclave_id: ::ethers::core::types::Address,
        pub queue_id: ::ethers::core::types::Address,
        pub balance: ::ethers::core::types::U256,
        pub status: u8,
        pub config: FunctionConfig,
        pub state: FunctionState,
    }
    ///`FacetCut(address,uint8,bytes4[])`
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
    pub struct FacetCut {
        pub facet_address: ::ethers::core::types::Address,
        pub action: u8,
        pub function_selectors: ::std::vec::Vec<[u8; 4]>,
    }
    ///`Facet(address,bytes4[])`
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
    pub struct Facet {
        pub facet_address: ::ethers::core::types::Address,
        pub function_selectors: ::std::vec::Vec<[u8; 4]>,
    }
    ///`Oracle(string,address,uint8,uint256,address,address)`
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
    pub struct Oracle {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub num_rows: u8,
        pub last_heartbeat: ::ethers::core::types::U256,
        pub queue_id: ::ethers::core::types::Address,
        pub owner: ::ethers::core::types::Address,
    }
    ///`AttestationConfig(address,bytes32[],bool,bool)`
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
    pub struct AttestationConfig {
        pub attestation_queue_id: ::ethers::core::types::Address,
        pub mr_enclaves: ::std::vec::Vec<[u8; 32]>,
        pub require_valid_enclave: bool,
        pub require_heartbeat_permission: bool,
    }
    ///`OracleQueue(string,address,address[],bool,uint256,uint256,uint256,uint256,uint256)`
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
    pub struct OracleQueue {
        pub name: ::std::string::String,
        pub authority: ::ethers::core::types::Address,
        pub oracles: ::std::vec::Vec<::ethers::core::types::Address>,
        pub unpermissioned_feeds_enabled: bool,
        pub max_size: ::ethers::core::types::U256,
        pub reward: ::ethers::core::types::U256,
        pub oracle_timeout: ::ethers::core::types::U256,
        pub gc_idx: ::ethers::core::types::U256,
        pub curr_idx: ::ethers::core::types::U256,
    }
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
}
