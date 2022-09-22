export class ApiError extends Error {
    errors: Array<any> = [];
    errStatus: number;

    constructor(errStatus: number = 400, message:string, errors: Array<any> = []) {
        super(message)
        this.errors = errors;
        this.errStatus = errStatus;
    }

    static unauthorized(): ApiError{
        return new ApiError(401, "User is not authorized");
    }

    static badRequest(errStatus: number, message: string, errors: Array<any> = []): ApiError {
        return new ApiError(errStatus, message, errors);
    }
}
