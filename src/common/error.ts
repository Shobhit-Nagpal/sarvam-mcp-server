export class SarvamError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: unknown,
  ) {
    super(message);
    this.name = "SarvamError";
  }
}

export class SarvamBadRequestError extends SarvamError {
  constructor(message = "Bad Request") {
    super(message, 400, { message });
    this.name = "SarvamBadRequestError";
  }
}

export class SarvamForbiddenRequestError extends SarvamError {
  constructor(message = "Forbidden Request") {
    super(message, 403, { message });
    this.name = "SarvamForbiddenRequestError";
  }
}

export class SarvamUnprocessableEntityError extends SarvamError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422, { message });
    this.name = "SarvamUnprocessableEntityError";
  }
}

export class SarvamInternalServerError extends SarvamError {
  constructor(message = "Internal Server Error") {
    super(message, 500, { message });
    this.name = "SarvamInternalServerError";
  }
}

export class SarvamUnavailableServiceError extends SarvamError {
  constructor(message = "Service Unavailable") {
    super(message, 503, { message });
    this.name = "SarvamUnavailableServiceError";
  }
}

export function isSarvamError(error: unknown): error is SarvamError {
  return error instanceof SarvamError;
}

export function createSarvamError(status: number, response: any): SarvamError {
  switch (status) {
    case 400:
      return new SarvamBadRequestError(response?.message);
    case 403:
      return new SarvamForbiddenRequestError(response?.message);
    case 422:
      return new SarvamUnprocessableEntityError(response?.message);
    case 500:
      return new SarvamInternalServerError(response?.message);
    case 503:
      return new SarvamUnavailableServiceError(response?.message);
    default:
      return new SarvamError(
        response?.message || "Sarvam API error",
        status,
        response,
      );
  }
}
