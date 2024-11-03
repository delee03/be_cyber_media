import { responseError } from "./response.helper.js";

export const handlerError = (error, req, res, next) => {
    console.log(`Lỗi ở next error ${error}`);
    const resData = responseError(error.message, error.code, error.stack);
    res.status(resData.code).json(resData);
};

export class BadRequestError extends Error {
    constructor(message = "Bad Request") {
        super(message);
        this.name = "BadRequestError";
        this.code = 400;
    }
}

export class UnauthorizedError extends Error {
    constructor(message123 = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}

export class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
        this.name = "NotFoundError";
        this.code = 404;
    }
}

export class InternalServerError extends Error {
    constructor(message = "Internal Server Error") {
        super(message);
        this.name = "InternalServerError";
        this.code = 500;
    }
}
