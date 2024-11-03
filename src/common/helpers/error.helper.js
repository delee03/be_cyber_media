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
