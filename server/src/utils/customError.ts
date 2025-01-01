class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // maintains the stack tracks, helps in debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
