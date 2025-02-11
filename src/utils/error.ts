class GeneralError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  getCode(): number {
    return 500;
  }
}

class BadRequest extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "Bad Request";
  }

  getCode(): number {
    return 400;
  }
}

class Forbidden extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "Forbidden";
  }

  getCode(): number {
    return 403;
  }
}

class NotFound extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "Not Found";
  }

  getCode(): number {
    return 404;
  }
}

class DatabaseError extends GeneralError {
  constructor(message: string) {
    super(message);
    this.name = "Database Error";
  }

  getCode(): number {
    return 500;
  }
}

export { GeneralError, BadRequest, Forbidden, NotFound, DatabaseError };
