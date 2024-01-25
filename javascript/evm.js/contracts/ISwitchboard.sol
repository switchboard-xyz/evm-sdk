//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ISwitchboard {
    //=========================================================================
    // Events
    //=========================================================================

    // [Function Verify]
    event VerifyFailed(
        address indexed functionId,
        address indexed callId,
        uint256 indexed code
    );

    // [Request]
    event RequestEvent(
        address indexed functionId,
        address indexed sender,
        address indexed requestId,
        bytes params
    );
    event RequestFund(
        address indexed functionId,
        address indexed funder,
        uint256 amount
    );
    event RequestWithdraw(
        address indexed functionId,
        address indexed funder,
        uint256 amount
    );

    // [Routine]
    event RoutineFund(
        address indexed functionId,
        address indexed funder,
        uint256 amount
    );
    event RoutineWithdraw(
        address indexed functionId,
        address indexed funder,
        uint256 amount
    );
    event RoutineCreated(
        address indexed functionId,
        address indexed sender,
        address indexed routineId,
        bytes params
    );

    // [Function Calls -- DEPRECATED]
    event FunctionCallFund(
        address indexed functionId,
        address indexed funder,
        uint256 indexed amount
    );
    event FunctionCallEvent(
        address indexed functionId,
        address indexed sender,
        address indexed callId,
        bytes params
    );

    // [Functions]
    event FunctionFund(
        address indexed functionId,
        address indexed funder,
        uint256 indexed amount
    );
    event FunctionWithdraw(
        address indexed functionId,
        address indexed withdrawer,
        uint256 indexed amount
    );
    event FunctionAccountInit(
        address indexed authority,
        address indexed accountId
    );

    // [Attestation Queues]
    event AttestationQueueAccountInit(
        address indexed authority,
        address indexed accountId
    );
    event AddMrEnclave(address indexed queueId, bytes32 mrEnclave);
    event RemoveMrEnclave(address indexed queueId, bytes32 mrEnclave);
    event AttestationQueueSetConfig(
        address indexed queueId,
        address indexed authority
    );
    event AttestationQueuePermissionUpdated(
        address indexed queueId,
        address indexed granter,
        address indexed grantee,
        uint256 permission
    );

    // [Enclaves]
    event EnclaveAccountInit(address indexed signer, address indexed accountId);
    event EnclaveHeartbeat(address indexed enclaveId, address indexed signer);
    event EnclaveGC(address indexed enclaveId, address indexed queue);
    event EnclavePayoutEvent(
        address indexed nodeId,
        address indexed enclaveId,
        uint256 indexed amount
    );
    event EnclaveVerifyRequest(
        address indexed queueId,
        address indexed verifier,
        address indexed verifiee
    );
    event EnclaveRotateSigner(
        address indexed queueId,
        address indexed oldSigner,
        address indexed newSigner
    );

    //=========================================================================
    // Errors
    //=========================================================================
    error AggregatorDoesNotExist(address aggregatorId);
    error OracleQueueDoesNotExist(address oracleQueueId);
    error InsufficientBalance(uint256 expectedBalance, uint256 receivedBalance);
    error AggregatorAlreadyExists(address aggregatorId);
    error OracleAlreadyExists(address oracleId);
    error OracleExpired(address oracleId);
    error InvalidAuthority(
        address expectedAuthority,
        address receivedAuthority
    );
    error InvalidSigner(address expectedSigner, address receivedSigner);
    error InvalidArgument(uint256 argumentIndex);
    error PermissionDenied(
        address granter,
        address grantee,
        uint256 permission
    );
    error InsufficientSamples(uint256 expected, uint256 received);
    error EarlyOracleResponse(address oracleId);
    error IntervalHistoryNotRecorded(address aggregatorId);
    error MrEnclaveNotAllowed(address queueId, bytes32 mrEnclave);
    error QueuesDoNotMatch(address expectedQueueId, address receivedQueueId);
    error EnclaveUnverified(address enclaveId);
    error EnclaveNotReadyForVerification(address enclaveId);
    error EnclaveNotOnQueue(address queueId, address enclaveId);
    error EnclaveNotAtQueueIdx(
        address queueId,
        address enclaveId,
        uint256 enclaveIdx
    );
    error OracleNotOnQueue(address queueId, address oracleId);
    error OracleNotAtQueueIdx(
        address queueId,
        address oracleId,
        uint256 oracleIdx
    );
    error InvalidEnclave(address enclaveId);
    error EnclaveExpired(address enclaveId);
    error AttestationQueueDoesNotExist(address attestationQueueId);
    error EnclaveDoesNotExist(address enclaveId);
    error FunctionDoesNotExist(address functionId);
    error EnclaveAlreadyExists(address enclaveId);
    error AttestationQueueAlreadyExists(address attestationQueueId);
    error FunctionAlreadyExists(address functionId);
    error InsufficientNodes(uint256 expected, uint256 received);
    error InvalidEntry();
    error GasLimitExceeded(uint256 limit, uint256 used);
    error TransactionExpired(uint256 expirationTime);
    error AlreadyExecuted(bytes32 txHash);
    error InvalidSignature(
        address expectedSender,
        bytes32 txHash,
        bytes signature
    );
    error FunctionCallerNotPermitted(address functionId, address sender);
    error FunctionMrEnclaveMismatch(bytes32 expected, bytes32 received);
    error FunctionSignerAlreadySet(address current, address received);
    error FunctionFeeTooLow(
        address functionId,
        uint256 expected,
        uint256 received
    );
    error FunctionIncorrectTarget(address functionId, address received);
    error IncorrectReportedTime(uint256 maxExpectedTime, uint256 reportedTime);
    error SubmittedResultsMismatch(uint256 aggregators, uint256 results);
    error ForceOverrideNotReady(address queueId);
    error InvalidStatus(address account, uint256 expected, uint256 received);
    error ExcessiveGasSpent(uint256 gasLimit, uint256 gasSpent);
    error ACLNotAdmin(address account);
    error ACLNotAllowed(address account);
    error ACLAdminAlreadyInitialized();
    error IncorrectToken(address expected, address received);
    error TokenTransferFailure(address token, address to, uint256 amount);
    error StakeNotReady(address queueId, address staker, uint256 readyAt);
    error StakeNotReadyForWithdrawal(
        address queueId,
        address staker,
        uint256 readyAt
    );
    error EnclaveNotFullyStaked(address enclaveId);
    error InvalidCallId(address callId);
    error CallIdAlreadyExists(address callId);
    error InsufficientCallFeePaid(
        address callId,
        uint256 expected,
        uint256 received
    );
    error InsufficientCallBalance(
        address callId,
        uint256 expected,
        uint256 received
    );
    error CallExceededMaxGasCost(
        address callId,
        uint256 expected,
        uint256 received
    );
    error IncorrectFunctionId(address expected, address received);
    error RoutineIdAlreadyExists(address routineId);
    error RequestIdAlreadyExists(address requestId);
    error InvalidRoutineId(address routineId);
    error RoutinesDisabled(address functionId);
    error RequestAlreadyExists(address requestId);
    error Generic();

    //=========================================================================
    // Structs
    //=========================================================================

    // [Transactions]
    struct Transaction {
        uint256 expirationTimeSeconds;
        uint256 gasLimit;
        uint256 value;
        address to;
        address from;
        bytes data;
    }

    // [Function Verify]
    struct FunctionVerifyParams {
        uint256 enclaveIdx; // verifier enclave idx
        address functionId; // function being run
        address delegatedSignerAddress; // enclave signer
        uint256 observedTime; // observed time in enclave
        uint256 nextAllowedTimestamp;
        bytes32 mrEnclave; // enclave measurement
        Transaction[] transactions; // transactions to run
        bytes[] signatures; // signatures for each transaction
        //---- below are optional params / just to handle calls ----
        address[] ids; // List of function calls resolved by this run
        bytes32[] checksums; // List of params checksums for each function call
        uint8[] codes; // Failure reason for individual calls (0 if successful)
    }

    struct FunctionFailParams {
        uint256 enclaveIdx; // verifier enclave idx
        address functionId; // function being run
        uint256 observedTime; // observed time in enclave
        uint256 nextAllowedTimestamp;
        uint8 code; // reason for failure
        //---- below are optional params to handle calls ----
        address[] ids; // List of function calls resolved by this run / marked as failed
        bytes32[] checksums; // List of params checksums for each function call
        uint8[] codes; // Failure reason for individual calls
    }

    struct FunctionVerifyDetails {
        uint256 lastContainerPullTimestamp;
        string lastPulledVersion;
        string lastPulledContainer;
        string lastPulledRegistry;
    }

    // [Request]
    struct Request {
        address functionId;
        address authority;
        uint256 createdAt;
        bytes requestData;
        bool executed;
        uint256 consecutiveFailures;
        uint256 balance;
        uint256 startAfter;
        uint8 errorCode;
        uint256 executedAt;
        FunctionStatus status;
    }

    // [Routine]
    struct Routine {
        address functionId;
        address authority;
        string schedule;
        bytes params;
        uint256 lastCalledAt;
        uint256 consecutiveFailures;
        uint256 balance;
        FunctionStatus status;
        uint8 errorCode;
    }

    // [Function Settings]
    struct FunctionSettings {
        // maximum gas cost that a function call can cost
        uint256 maxGasCost;
        // require isolated runs for each routine and request
        bool requireIsolatedRuns;
        // --- Routines ---
        // routines_disabled
        bool routinesDisabled;
        // require fn authority to sign new routines
        bool routinesRequireAuthorization;
        // routine users must pay a fee for each execution to the fn authority
        uint256 routineFee;
        // --- Requests ---
        // requests_disabled
        bool requestsDisabled;
        // require fn authority to sign new requests
        uint256 requestFee;
        // require fn authority to sign new routines
        bool requestsRequireAuthorization;
    }

    // [Function Calls - deprecated]
    struct FunctionCall {
        address functionId;
        address caller;
        uint256 timestamp;
        bytes callData;
        bool executed;
        uint256 consecutiveFailures;
        uint256 feePaid;
    }

    // [Function Call Settings deprecated - see FunctionSettings]
    struct FunctionCallSettings {
        // require the function call to pay the estimated run cost fee
        bool requireEstimatedRunCostFee;
        // minimum fee that a function call must pay
        uint256 minimumFee;
        // maximum gas cost that a function call can cost
        uint256 maxGasCost;
        // fail calls if the caller does not pay the full cost of the call
        bool requireCallerPayFullCost;
        // requires the callback target to be the caller contract
        bool requireSenderBeReturnAddress;
    }

    // [Functions]
    enum FunctionStatus {
        NONE,
        ACTIVE,
        NON_EXECUTABLE,
        EXPIRED,
        OUT_OF_FUNDS,
        INVALID_PERMISSIONS,
        DEACTIVATED
    }

    struct SbFunction {
        string name;
        address authority;
        address enclaveId;
        address queueId;
        uint256 balance;
        FunctionStatus status;
        FunctionConfig config;
        FunctionState state;
    }

    struct FunctionConfig {
        string schedule;
        address[] permittedCallers;
        string containerRegistry;
        string container;
        string version;
        string paramsSchema;
        bytes32[] mrEnclaves;
        bool allowAllFnCalls;
        bool useFnCallEscrow;
    }

    struct FunctionState {
        uint256 consecutiveFailures;
        uint256 lastExecutionTimestamp;
        uint256 nextAllowedTimestamp;
        uint256 lastExecutionGasCost;
        uint256 triggeredSince; // first call time in seconds
        uint256 triggerCount; // number of calls
        // queueIdx should only be referenced off-chain
        // - and only with modulo queue length in case the queue is resized
        uint256 queueIdx;
        bool triggered;
        uint256 createdAt;
    }

    // [Attestation Queues]
    struct AttestationQueue {
        address authority;
        address[] data;
        uint256 maxSize;
        uint256 reward;
        uint256 lastHeartbeat;
        bytes32[] mrEnclaves;
        uint256 maxEnclaveVerificationAge;
        uint256 allowAuthorityOverrideAfter;
        uint256 maxConsecutiveFunctionFailures;
        bool requireAuthorityHeartbeatPermission; // require heartbeat permission to heartbeat
        bool requireUsagePermissions; // require permissions to enclave verify
        // queue state tracking
        uint256 enclaveTimeout;
        uint256 gcIdx;
        uint256 currIdx;
    }

    // [Enclaves]
    enum VerificationStatus {
        PENDING,
        FAILURE,
        SUCCESS,
        OVERRIDE
    }

    struct Enclave {
        address signer;
        address authority;
        address queueId;
        bytes cid;
        VerificationStatus verificationStatus;
        uint256 verificationTimestamp;
        uint256 validUntil;
        bytes32 mrEnclave;
        // verifiers
        bool isOnQueue;
        uint256 lastHeartbeat;
        // balance of the Enclave
        uint256 balance;
    }

    //=========================================================================
    // User Functions
    //=========================================================================

    // [Function Verify]

    /**
     * Verify a function result from an enclave and submit its results on-chain
     * @param params FunctionVerifyParams struct
     * @dev reverts if the function does not exist
     * @dev reverts if the caller is not a valid enclave with authority to operate on the queue
     * @dev reverts if the enclave is not on the queue
     * @dev reverts if the user transactions submitted fail or use excessive gas
     * @dev reverts if the user function doesn't have enough funds to cover the transaction + gas
     */
    function verifyFunctionResult(FunctionVerifyParams memory params) external;

    /**
     * Mark a function result as failed from an enclave and submit its results on-chain
     * @param params FunctionFailParams struct
     * @dev reverts if the function does not exist
     * @dev reverts if the caller is not a valid enclave with authority to operate on the queue
     * @dev reverts if the enclave is not on the queue
     */
    function failFunctionResult(FunctionFailParams memory params) external;

    // [Call Verify]

    /**
     * verifyCallbackParams - used to verify that a function call was run with the correct params
     * - verifies that the function call was run with the correct params
     * @param callIds the callIds that were used to call the function
     * @param hashes the hashes of the params that were used to call the function
     * @dev reverts if the hashes do not match the param hashes the request / routine was created with
     */
    function verifyCallbackParams(
        address[] memory callIds,
        bytes32[] memory hashes
    ) external view;

    // [Request]

    /**
     * Call a function with params - and pay into the function's escrow (if applicable)
     * @param functionId the function's id to be called
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @return id the call's id
     * @dev reverts if the function does not exist
     * @dev reverts if the caller's address is not allowed to call the function
     * @dev reverts if the function isn't called with enough funding
     * @dev emits RequestEvent
     */
    function sendRequest(
        address functionId,
        bytes memory params
    ) external payable returns (address id);

    /**
     * Call a function with params and assign it an ID - and pay into the function's escrow (if applicable)
     * @param requestId the request's id
     * @param functionId the function's id to be called
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @return id the call's id
     * @dev reverts if the function does not exist
     * @dev reverts if the caller's address is not allowed to call the function
     * @dev reverts if the function isn't called with enough funding
     * @dev reverts if a request has already been made with that id
     * @dev emits RequestEvent
     */
    function sendRequestWithId(
        address requestId,
        address functionId,
        bytes memory params
    ) external payable returns (address id);

    /**
     * Call a function with params, an ID, and a start time - and pay into the function's escrow (if applicable)
     * @param requestId the request's id
     * @param functionId the function's id to be called
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @param startAfter the timestamp to start the request after
     * @dev reverts if the function does not exist
     * @dev reverts if the caller's address is not allowed to call the function
     * @dev reverts if the function isn't called with enough funding
     * @dev reverts if a request has already been made with that id
     * @dev emits RequestEvent
     */
    function sendDelayedRequest(
        address requestId,
        address functionId,
        bytes memory params,
        uint256 startAfter
    ) external payable;

    /**
     * Get a request by id
     * @param requestId the request's id
     * @return Request struct for the request
     */
    function requests(address requestId) external view returns (Request memory);

    /**
     * Get active requests by thir queue id
     * @param queueId the queue's id
     */
    function getActiveRequestsByQueue(
        address queueId
    ) external view returns (address[] memory, Request[] memory);

    /**
     * Fund a request
     * @param requestId the request's id
     * @dev emits RequestFund
     * @dev reverts if request doesn't exist
     */
    function requestFund(address requestId) external payable;

    /**
     * Withdraw from a request
     * @param requestId the request's id
     * @param recipient recipient address
     * @param amount the amount to withdraw
     * @dev emits RequestWithdraw
     * @dev reverts if not the request caller
     */
    function requestWithdraw(
        address requestId,
        address recipient,
        uint256 amount
    ) external;

    /**
     * Get requests by function id
     * @param functionId the function's id
     */
    function getRequestsByFunction(
        address functionId
    ) external view returns (address[] memory, Request[] memory);

    // [Routine]

    /**
     * Create Routine with Id
     * @param routineId the routine's id
     * @param functionId the function's id to be called
     * @param authority the routine authority
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @param schedule the cron schedule for the routine
     */
    function createRoutineWithId(
        address routineId,
        address functionId,
        address authority,
        bytes calldata params,
        string calldata schedule
    ) external payable;

    /**
     * Update Routine
     * @param routineId the routine's id
     * @param functionId the function's id to be called
     * @param authority the routine authority
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @param schedule the cron schedule for the routine
     * @dev reverts if the routine doesn't exist
     * @dev reverts if the caller is not the routine authority
     */
    function updateRoutine(
        address routineId,
        address functionId,
        address authority,
        bytes calldata params,
        string calldata schedule
    ) external;

    /**
     * Fund routine
     * @param routineId the routine's id
     * @dev reverts if the routine doesn't exist
     */
    function routineEscrowFund(address routineId) external payable;

    /**
     * Withdraw from a routine
     * @param routineId the routine's id
     * @param amount amount to withdraw
     */
    function routineEscrowWithdraw(address routineId, uint256 amount) external;

    /**
     * Check if a routine exists
     * @param routineId the routine's id
     */
    function routineExists(address routineId) external view returns (bool);

    /**
     * Get routines by routine id
     * @param routineId the routine's id
     */
    function routines(address routineId) external view returns (Routine memory);

    /**
     * Get active routines by queue id
     * @param queueId the queue's id
     */
    function getActiveRoutinesByQueue(
        address queueId
    ) external view returns (address[] memory, Routine[] memory);

    /**
     * Get routines by authority
     * @param authority the routine's authority
     */
    function getRoutinesByAuthority(
        address authority
    ) external view returns (address[] memory, Routine[] memory);

    /**
     * Get routines by function id
     * @param functionId the function's id
     * @return routines array of routines
     */
    function getRoutinesByFunction(
        address functionId
    ) external view returns (address[] memory, Routine[] memory);

    // [Function Settings]

    /**
     * Get a function's settings
     * @param functionId the function's id
     * @return FunctionSettings struct for the function
     */
    function functionSettings(
        address functionId
    ) external returns (FunctionSettings memory);

    /**
     * Set a function's settings
     * @param functionId the function's id
     * @param settings FunctionSettings memory settings
     * @dev reverts if the caller is not the function's authority
     */
    function setFunctionSettings(
        address functionId,
        FunctionSettings memory settings
    ) external;

    // [Function Calls - deprecated]

    /**
     * Call a function with params - and pay into the function's escrow (if applicable)
     * @param functionId the function's id to be called
     * @param params arbitrary data encoded and passed to the function (for off-chain use)
     * @return callId the call's id
     * @dev reverts if the function does not exist
     * @dev reverts if the caller's address is not allowed to call the function
     * @dev reverts if the function isn't called with enough funding
     * @dev emits FunctionCallEvent
     * @dev emits FunctionCallFund if the function call is funded
     */
    function callFunction(
        address functionId,
        bytes calldata params
    ) external payable returns (address callId);

    /**
     * Get estimated run cost for a function (based on last run + gas price)
     * - this is just supposed to predict gas cost of running a function
     * @param functionId the function's id
     * @param gasPrice the gas price to use for the estimate
     */
    function estimatedRunCost(
        address functionId,
        uint256 gasPrice
    ) external view returns (uint256);

    /**
     * Set parameters around calling functions - each of these defaults to 0 / false / empty
     * @param functionId the function's id
     * @param requireEstimatedRunCostFee require that the payment be at least the estimated run cost
     * (uses recent runs for gas cost estimation, so first is the least expensive)
     * @param minimumFee minimum fee that a function caller must pay
     * @param maxGasCost maximum gas cost that a function run can cost
     * @param requireCallerPayFullCost require that the caller pay the full cost of the call
     * @param requireSenderBeReturnAddress require that the callback target be the caller contract
     * @dev reverts if the caller is not the function's authority
     */
    function setFunctionCallSettings(
        address functionId,
        bool requireEstimatedRunCostFee,
        uint256 minimumFee,
        uint256 maxGasCost,
        bool requireCallerPayFullCost,
        bool requireSenderBeReturnAddress
    ) external;

    /**
     * Get a function call by callId
     * @param callId the call's id
     * @return FunctionCall struct for the call
     */
    function functionCalls(
        address callId
    ) external view returns (FunctionCall memory);

    /**
     * Get a function call's settings
     * @param functionId the function's id
     * @return FunctionCallSettings struct for the function
     */
    function functionCallSettings(
        address functionId
    ) external view returns (FunctionCallSettings memory);

    // [Functions]

    /**
     * Create a function with a particular id
     * @param functionId the function's id
     * @param name name exposed to the Switchboard Explorer
     * @param authority the function's authority
     * @param queueId the function's queue (which will resolve function runs)
     * @param containerRegistry "dockerhub"
     * @param container container name, ex: "switchboardlabs/function-example"
     * @param version container version tag, ex: "latest"
     * @param schedule cron schedule, ex: "0 * * * *"
     * @param paramsSchema json schema for the function's params
     * @param permittedCallers array of addresses that are allowed to call the function (empty array for all)
     * @dev emits FunctionAccountInit event
     */
    function createFunctionWithId(
        address functionId,
        string memory name,
        address authority,
        address queueId,
        string memory containerRegistry,
        string memory container,
        string memory version,
        string memory schedule,
        string memory paramsSchema,
        address[] memory permittedCallers
    ) external payable;

    /**
     * Set parameters around calling functions - each of these defaults to 0 / false / empty
     * @param functionId the function's id
     * @param name name exposed to the Switchboard Explorer
     * @param authority the function's authority
     * @param containerRegistry "dockerhub"
     * @param container container name, ex: "switchboardlabs/function-example"
     * @param version container version tag, ex: "latest"
     * @param schedule cron schedule, ex: "0 * * * *"
     * @param paramsSchema json schema for the function's params
     * @param permittedCallers array of addresses that are allowed to call the function (empty array for all)
     * @dev reverts if the caller is not the function's authority
     */
    function setFunctionConfig(
        address functionId,
        string memory name,
        address authority,
        string memory containerRegistry,
        string memory container,
        string memory version,
        string memory schedule,
        string memory paramsSchema,
        address[] memory permittedCallers
    ) external;

    /**
     * Fund a function's escrow
     * @param accountId the function's id
     * @dev emits FunctionFund event
     */
    function functionEscrowFund(address accountId) external payable;

    /**
     * Withdraw from a function's escrow
     * @param recipient recipient address
     * @param functionId the function's id
     * @param amount the amount to withdraw
     * @dev reverts if the caller is not the function's authority
     * @dev emits FunctionWithdraw event
     */
    function functionEscrowWithdraw(
        address payable recipient,
        address functionId,
        uint256 amount
    ) external;

    /**
     * Check if function exists
     * @param functionId the function's id
     * @return bool true if the function exists
     */
    function functionExists(address functionId) external view returns (bool);

    /**
     * Get a function by id
     * @param functionId the function's id
     * @return SbFunction struct for the function
     */
    function funcs(
        address functionId
    ) external view returns (SbFunction memory);

    /**
     * Get the allowed callers for a function
     * @param functionId the function's id
     */
    function getFunctionPermittedCallers(
        address functionId
    ) external view returns (address[] memory);

    /**
     * Get all functions and their addresses
     * @return address[] array of function ids
     * @return SbFunction[] array of functions
     * @dev addresses returned and functions returned will be the same length
     */
    function getAllFunctions()
        external
        view
        returns (address[] memory, SbFunction[] memory);

    /**
     * Get all functions by authority and their addresses
     * @param user the user's address
     * @return address[] array of function ids
     * @return SbFunction[] array of functions
     * @dev addresses returned and functions returned will be the same length
     */
    function getFunctionsByAuthority(
        address user
    ) external view returns (address[] memory, SbFunction[] memory);

    /**
     * Get the allowed enclave measurements for a function
     * @param functionId the function's id
     */
    function getFunctionMrEnclaves(
        address functionId
    ) external view returns (bytes32[] memory);

    /**
     * Add an allowed enclave measurement to a function
     * @param functionId the function's id
     * @param mrEnclave the enclave measurement
     * @dev reverts if the caller is not the function's authority
     */
    function addMrEnclaveToFunction(
        address functionId,
        bytes32 mrEnclave
    ) external;

    /**
     * Remove an enclave measurement from a function
     * @param functionId the function's id
     * @param mrEnclave the enclave measurement to remove
     * @dev reverts if the caller is not the function's authority
     */
    function removeMrEnclaveFromFunction(
        address functionId,
        bytes32 mrEnclave
    ) external;

    // [Attestation Queues]

    /**
     * Get an attestation queue by id
     * @param queueId queue's id
     * @return AttestationQueue struct
     */
    function attestationQueues(
        address queueId
    ) external view returns (AttestationQueue memory);

    // [Enclaves]

    /**
     * Get an enclave by ID
     * @param enclaveId the enclave's id
     */
    function enclaves(address enclaveId) external view returns (Enclave memory);

    //=========================================================================
    // Switchboard Internal Functions
    //=========================================================================

    // [Attestation Queues]

    /**
     * Check if an attestation queue allows a particular enclave measurement to verify
     * @param queueId the queue's id
     * @param mrEnclave the enclave measurement
     * @return bool true if the queue allows the enclave to verify
     */
    function attestationQueueHasMrEnclave(
        address queueId,
        bytes32 mrEnclave
    ) external view returns (bool);

    /**
     * Get an enclave's index on the Attestation Queue
     * @param enclaveId the enclave's id
     * @return int256 the enclave's index on the queue
     * @dev returns -1 if the enclave is not on the queue
     */
    function getEnclaveIdx(address enclaveId) external view returns (int256);

    /**
     * Get all allowed enclave measurements for a given queue
     * @param queueId the queue's id
     * @return bytes32[] array of enclave measurements
     */
    function getAttestationQueueMrEnclaves(
        address queueId
    ) external view returns (bytes32[] memory);

    /**
     * Get an array of all enclaves on a given queue
     * @param queueId the queue's id
     */
    function getEnclaves(
        address queueId
    ) external view returns (address[] memory);

    /**
     * Create an Attestation Queue
     * @param authority the queue's authority
     * @param maxSize max number of enclaves allowed on the queue
     * @param reward reward for enclave verification
     * @param enclaveTimeout time in seconds before an enclave is timed out
     * @param maxEnclaveVerificationAge max age in seconds for an enclave verification
     * @param allowAuthorityOverrideAfter time in seconds before the authority can override an enclave
     * @param requireAuthorityHeartbeatPermission require authority permissions for enclave heartbeat
     * @param requireUsagePermissions require permissions for using the queue
     * @param maxConsecutiveFunctionFailures max number of consecutive function failures before an enclave is timed out
     * @dev emits AttestationQueueAccountInit event
     */
    function createAttestationQueue(
        address authority,
        uint256 maxSize,
        uint256 reward,
        uint256 enclaveTimeout,
        uint256 maxEnclaveVerificationAge,
        uint256 allowAuthorityOverrideAfter,
        bool requireAuthorityHeartbeatPermission,
        bool requireUsagePermissions,
        uint256 maxConsecutiveFunctionFailures
    ) external;

    /**
     * Set an Attestation Queue's config
     * @param queueId the queue's id
     * @param authority the queue's authority
     * @param maxSize max number of enclaves allowed on the queue
     * @param reward reward for enclave verification
     * @param enclaveTimeout time in seconds before an enclave is timed out
     * @param maxEnclaveVerificationAge max age in seconds for an enclave verification
     * @param allowAuthorityOverrideAfter time in seconds before the authority can override an enclave
     * @param requireAuthorityHeartbeatPermission require authority permissions for enclave heartbeat
     * @param requireUsagePermissions require permissions for using the queue
     * @param maxConsecutiveFunctionFailures max number of consecutive function failures before an enclave is timed out
     * @dev reverts if the caller is not the queue's authority
     * @dev emits AttestationQueueSetConfig event
     */
    function setAttestationQueueConfig(
        address queueId,
        address authority,
        uint256 maxSize,
        uint256 reward,
        uint256 enclaveTimeout,
        uint256 maxEnclaveVerificationAge,
        uint256 allowAuthorityOverrideAfter,
        bool requireAuthorityHeartbeatPermission,
        bool requireUsagePermissions,
        uint256 maxConsecutiveFunctionFailures
    ) external;

    /**
     * Add an enclave measurement to an attestation queue
     * @param queueId the queue's id
     * @param mrEnclave the enclave measurement
     * @dev reverts if the caller is not the queue's authority
     * @dev emits AddMrEnclave event
     */
    function addMrEnclaveToAttestationQueue(
        address queueId,
        bytes32 mrEnclave
    ) external;

    /**
     * Remove an enclave measurement from an attestation queue
     * @param queueId the queue's id
     * @param mrEnclave the enclave measurement
     * @dev reverts if the caller is not the queue's authority
     * @dev emits RemoveMrEnclave event
     */
    function removeMrEnclaveFromAttestationQueue(
        address queueId,
        bytes32 mrEnclave
    ) external;

    /**
     * Set an attestation queue's permissions
     * @param queueId the queue's id
     * @param grantee the address to grant permissions to
     * @param permission the permission to grant
     * @param on true if the permission should be granted
     * @dev reverts if the caller is not the queue's authority
     * @dev emits AttestationQueuePermissionUpdated event
     */
    function setAttestationQueuePermission(
        address queueId,
        address grantee,
        uint256 permission,
        bool on
    ) external;

    // [Enclaves]

    /**
     * Get a signer's associated enclaveId
     * @param signer the enclave's signer
     * @return enclaveId the enclave's id
     * @dev returns address(0) if the enclave does not exist
     */
    function enclaveSignerToEnclaveId(
        address signer
    ) external view returns (address);

    /**
     * Validate that a signer has a valid queue
     * @param signer signer's address
     * @param attestationQueueId the queue's id
     * @param validMeasurements  array of valid enclave measurements
     * @dev reverts if the signer does not have a valid enclave
     */
    function validate(
        address signer,
        address attestationQueueId,
        bytes32[] memory validMeasurements
    ) external view;

    /**
     * Check if an enclave is valid
     * @param enclaveId the enclave's id
     * @return bool true if the enclave is valid
     */
    function isEnclaveValid(address enclaveId) external view returns (bool);

    /**
     * Create an enclave account
     * @param signer the enclave's signer address
     * @param queueId the enclave's queue
     * @param authority the enclave authority
     * @dev emits EnclaveAccountInit event
     */
    function createEnclave(
        address signer,
        address queueId,
        address authority
    ) external;

    /**
     * Create an enclave account with a particular Id
     * @param enclaveId the enclave's id
     * @param signer the enclave's signer address
     * @param queueId the enclave's queue
     * @param authority the enclave authority
     * @dev emits EnclaveAccountInit event
     */
    function createEnclaveWithId(
        address enclaveId,
        address signer,
        address queueId,
        address authority
    ) external;

    /**
     * @param enclaveId the enclave's id
     * @param cid the quote content address
     * @dev emits EnclaveVerifyRequest
     */
    function updateEnclave(
        address enclaveId,
        bytes calldata cid
    ) external payable;

    /**
     * Override an enclave's verification status to initialize a queue
     * @param enclaveId the enclave's id
     * @dev reverts if the caller is not the queue's authority
     */
    function forceOverrideVerify(address enclaveId) external;

    /**
     * Try garbage collecting an enclave from a queue
     * @param enclaveId the enclave to gc
     * @param enclaveIdx the enclave's index on the queue
     * @dev emits EnclaveGC if the enclave is garbage collected
     */
    function enclaveGarbageCollect(
        address enclaveId,
        uint256 enclaveIdx
    ) external;

    /**
     * Fail an enclave / deny verification
     * @param verifierId the verifying enclave's id
     * @param enclaveId enclave id
     * @param verifierIdx the verifier's index on the queue
     * @dev emits EnclavePayoutEvent
     */
    function failEnclave(
        address verifierId,
        address enclaveId,
        uint256 verifierIdx
    ) external;

    /**
     * Verify enclave
     * @param verifierId verifying enclave id
     * @param enclaveId enclave id to verify
     * @param enclaveIdx verifier's index on the queue
     * @param timestamp timestamp of the verification
     * @param mrEnclave enclave measurement
     * @dev emits EnclavePayoutEvent
     */
    function verifyEnclave(
        address verifierId,
        address enclaveId,
        uint256 enclaveIdx,
        uint256 timestamp,
        bytes32 mrEnclave
    ) external;

    /**
     * Heartbeat enclave onto queue
     * @param enclaveId enclave id
     * @dev emits EnclaveHeartbeat event
     * @dev emits EnclaveGC event if the enclave is garbage collected
     */
    function enclaveHeartbeat(address enclaveId) external;

    /**
     * Swap enclave signers
     * @param enclaveId enclave id
     * @param newSigner new signer address
     * @dev will require an enclave verification or force override to actually heartbeat
     * @dev emits EnclaveRotateSigner
     */
    function rotateEnclaveSigner(address enclaveId, address newSigner) external;

    // [Function Calls]
    /**
     * Get all active functions by queue id
     * @param queueId the queue's id
     * @return address[] array of function ids on the queue (in order)
     * @return FunctionCall[] array of function calls on the queue (in order)
     * @dev addresses returned and functionCalls returned will be the same length
     */
    function getActiveFunctionCallsByQueue(
        address queueId
    ) external view returns (address[] memory, FunctionCall[] memory);

    // [Functions]
    /**
     * Create a function with a particular id
     * @param name name exposed to the Switchboard Explorer
     * @param authority the function's authority
     * @param queueId the function's queue (which will resolve function runs)
     * @param containerRegistry "dockerhub"
     * @param container container name, ex: "switchboardlabs/function-example"
     * @param version container version tag, ex: "latest"
     * @param schedule cron schedule, ex: "0 * * * *"
     * @param paramsSchema json schema for the function's params
     * @param permittedCallers array of addresses that are allowed to call the function (empty array for all)
     * @dev emits FunctionAccountInit event
     */
    function createFunction(
        string memory name,
        address authority,
        address queueId,
        string memory containerRegistry,
        string memory container,
        string memory version,
        string memory schedule,
        string memory paramsSchema,
        address[] memory permittedCallers
    ) external payable;

    /**
     * Get all active functions by queue id
     * @param queueId the queue's id
     * @return address[] array of function ids on the queue (in order)
     * @return SbFunction[] array of functions on the queue (in order)
     * @dev addresses returned and functions returned will be the same length
     */
    function getActiveFunctionsByQueue(
        address queueId
    ) external view returns (address[] memory, SbFunction[] memory);

    /**
     * Get the eip712 hash for a function call
     * @param expirationTimeSeconds revert if past this time in seconds
     * @param gasLimit gas limit for the function call
     * @param value value to send with the function call
     * @param to the target for this function call
     * @param from the caller for this function call
     * @param data the encoded function call data
     * @return bytes32 the eip712 hash
     */
    function getTransactionHash(
        uint256 expirationTimeSeconds,
        uint256 gasLimit,
        uint256 value,
        address to,
        address from,
        bytes memory data
    ) external view returns (bytes32);

    /**
     * Account for function run and execute function call
     * @param enclaveIdx enclave idx on the queue
     * @param functionId the function's id
     * @param delegatedSignerAddress the delegated signer's address (enclave signer)
     * @param observedTime the observed time of the function call
     * @param nextAllowedTimestamp the next allowed timestamp for the function call
     * @param isFailure true if the function call failed
     * @param mrEnclave enclave measurement
     * @param transactionsData array of transaction data
     * @param signatures array of signatures
     * @dev reverts if the caller is not a verified enclave authority
     */
    function functionVerify(
        uint256 enclaveIdx,
        address functionId,
        address delegatedSignerAddress,
        uint256 observedTime,
        uint256 nextAllowedTimestamp,
        bool isFailure,
        bytes32 mrEnclave,
        bytes32[] memory transactionsData,
        bytes[] memory signatures
    ) external;

    /**
     * Account for function run and execute function call, resolving a number of FuncionCalls
     * @param enclaveIdx enclave idx on the queue
     * @param functionId the function's id
     * @param delegatedSignerAddress the delegated signer's address (enclave signer)
     * @param observedTime the observed time of the function call
     * @param nextAllowedTimestamp the next allowed timestamp for the function call
     * @param isFailure true if the function call failed
     * @param mrEnclave enclave measurement
     * @param transactionsData array of transaction data
     * @param signatures array of signatures
     * @param functionCallIds array of function call ids
     * @dev reverts if the caller is not a verified enclave authority
     */
    function functionVerifyRequest(
        uint256 enclaveIdx,
        address functionId,
        address delegatedSignerAddress,
        uint256 observedTime,
        uint256 nextAllowedTimestamp,
        bool isFailure,
        bytes32 mrEnclave,
        bytes32[] memory transactionsData,
        bytes[] memory signatures,
        address[] memory functionCallIds
    ) external;

    /**
     * Execute function call
     * @param transactionsData array of transaction data
     * @param signatures array of signatures
     * @dev reverts if the caller is not allocated permissions by admin
     */
    function forward(
        bytes32[] calldata transactionsData,
        bytes[] calldata signatures
    ) external payable;

    /**
     * Deactivate a function - can only be called by queue authority
     * @param functionId function id for deactivation
     */
    function setFunctionDeactivated(address functionId) external;

    /**
     * Set the tolerated discrepancy between enclave reported time and on-chain time
     * @param tolerance the tolerance in seconds
     * @dev can only be called by contract admin
     */
    function setToleratedTimestampDiscrepancy(uint256 tolerance) external;
}
