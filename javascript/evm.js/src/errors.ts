interface IErrorDetails {
  method?: string;
  data?: string;
  errorArgs?: string;
  errorName?: string;
  errorSignature?: string;
  reason?: string | null;
  code?: string;
  version?: string;
}

export class EthersError extends Error {
  readonly method?: string;
  readonly data?: string;
  readonly errorArgs?: string;
  readonly errorName?: string;
  readonly errorSignature?: string;
  readonly reason?: string | null;
  readonly code?: string;
  readonly version?: string;

  private constructor(
    // the original error
    readonly err: Error,
    // the parsed details
    details: IErrorDetails
  ) {
    const message =
      details.method && details.errorName
        ? `Function call failed in method ${details.method} with error ${details.errorName} \nError: ${err.message}`
        : `${err.message}`;
    super(message);

    // this.stack = err.stack; // Might want to return an error and the caller manually override this

    this.method = details.method;
    this.data = details.data;
    this.errorArgs = details.errorArgs;
    this.errorName = details.errorName;
    this.errorSignature = details.errorSignature;
    this.reason = details.reason;
    this.code = details.code;
    this.version = details.version;

    Error.captureStackTrace(this, this.constructor);

    Object.setPrototypeOf(this, EthersError.prototype);
  }

  /**
   * Always throws an error
   */
  public static handleError(err: unknown): never {
    throw EthersError.convertError(err);
  }

  /**
   * Converts an error but never throws it
   */
  public static convertError(err: unknown): Error {
    if (!(err instanceof Error)) {
      // re-throw
      throw Error(`err`);
    }

    const ethersError = EthersError.fromErr(err);

    //
    if (SwitchboardErrorNames.includes(ethersError.errorName)) {
      const sbError = SwitchboardError.from(
        ethersError.errorName,
        ethersError.method,
        ethersError.err.message
      );
      return sbError;
    }

    // re-throw
    return ethersError;
  }

  public static fromErr(err: Error & Partial<IErrorDetails>) {
    let details: IErrorDetails = {
      method: err.method ?? "",
      data: err.data ?? "",
      errorArgs: err.errorArgs ?? "",
      errorName: err.errorName ?? "",
      errorSignature: err.errorSignature ?? "",
      reason: err.reason ?? "",
      code: err.code ?? "",
      version: err.version ?? "",
    };

    const message = err.message;

    const regex =
      /\(method="(.*?)", data="(.*?)", errorArgs=(.*?), errorName="(.*?)", errorSignature="(.*?)", reason=(.*?), code=(.*?), version=(.*?)\)/;
    const result = message.match(regex);

    if (result) {
      details = {
        method: result[1],
        data: result[2],
        errorArgs: result[3] === "[]" ? [] : JSON.parse(result[3]),
        errorName: result[4],
        errorSignature: result[5],
        reason: result[6] === "null" ? null : result[6],
        code: result[7],
        version: result[8],
      };
    }

    return new EthersError(err, details);
  }
}

export class SwitchboardError extends Error {
  constructor(
    readonly name: string,
    readonly method: string,
    _message: string
  ) {
    const message = `Function call reverted in method ${method} \nError: ${_message}`;
    super(message);

    Error.captureStackTrace(this, this.constructor);

    Object.setPrototypeOf(this, SwitchboardError.prototype);
  }

  public static from(
    name: string,
    method: string,
    _message: string
  ): SwitchboardError {
    switch (name) {
      case "AggregatorDoesNotExist":
        return new AggregatorDoesNotExist(method, _message);
      case "OracleQueueDoesNotExist":
        return new OracleQueueDoesNotExist(method, _message);
      case "InsufficientBalance":
        return new InsufficientBalance(method, _message);
      case "AggregatorAlreadyExists":
        return new AggregatorAlreadyExists(method, _message);
      case "OracleAlreadyExists":
        return new OracleAlreadyExists(method, _message);
      case "InvalidAuthority":
        return new InvalidAuthority(method, _message);
      case "InvalidArgument":
        return new InvalidArgument(method, _message);
      case "PermissionDenied":
        return new PermissionDenied(method, _message);
      case "InsufficientSamples":
        return new InsufficientSamples(method, _message);
      default:
        return new SwitchboardError(name, method, _message);
    }
  }

  // toString(): string {
  //   return `SWITCHBOARD_ERROR: ${this.err.errorSignature}\n\n${this.err.stack}`;
  // }

  // [util.inspect.custom](depth: number, opts: object): string {
  //   return `SwitchboardError: ${this.err.errorSignature}, method: ${
  //     this.err.method
  //   }, code: ${this.err.code}\n${this.err.err.toString()}\n${this.err.stack}`;
  // }
}

const SwitchboardErrorNames = [
  "AggregatorDoesNotExist",
  "OracleQueueDoesNotExist",
  "InsufficientBalance",
  "AggregatorAlreadyExists",
  "OracleAlreadyExists",
  "InvalidAuthority",
  "InvalidArgument",
  "PermissionDenied",
  "InsufficientSamples",
];

export class AggregatorDoesNotExist extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("AggregatorDoesNotExist", method, _message);

    Object.setPrototypeOf(this, AggregatorDoesNotExist.prototype);
  }
}

export class OracleQueueDoesNotExist extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("OracleQueueDoesNotExist", method, _message);

    Object.setPrototypeOf(this, OracleQueueDoesNotExist.prototype);
  }
}

export class InsufficientBalance extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("InsufficientBalance", method, _message);

    Object.setPrototypeOf(this, InsufficientBalance.prototype);
  }
}
export class AggregatorAlreadyExists extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("AggregatorAlreadyExists", method, _message);

    Object.setPrototypeOf(this, AggregatorAlreadyExists.prototype);
  }
}

export class OracleAlreadyExists extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("OracleAlreadyExists", method, _message);

    Object.setPrototypeOf(this, OracleAlreadyExists.prototype);
  }
}

export class InvalidAuthority extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("InvalidAuthority", method, _message);

    Object.setPrototypeOf(this, InvalidAuthority.prototype);
  }
}

export class InvalidArgument extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("InvalidArgument", method, _message);

    Object.setPrototypeOf(this, InvalidArgument.prototype);
  }
}

export class PermissionDenied extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("PermissionDenied", method, _message);

    Object.setPrototypeOf(this, PermissionDenied.prototype);
  }
}

export class InsufficientSamples extends SwitchboardError {
  constructor(readonly method: string, _message: string) {
    super("InsufficientSamples", method, _message);

    Object.setPrototypeOf(this, InsufficientSamples.prototype);
  }
}
