export class HttpError extends Error {
    constructor(
        public status: number = 400,
        message: string = "Api error"
    ) {
        super(message);
    }
}

export class ForbiddenRequestError extends HttpError {
    constructor() {
        super(403, "Forbidden request!");
    }
}

export class UnauthorizedRequestError extends HttpError {
    constructor(message?: string) {
        super(401, message || "Unauthorized request!");
    }
}

export class ResourceNotFoundError extends HttpError {
    constructor(message?: string) {
        super(404, message || "Resource not found!");
    }
}