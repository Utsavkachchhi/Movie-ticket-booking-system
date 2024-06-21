enum STATUS_CODES {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_VALID_DATA = 422,
    NOT_FOUND = 404,
    CONFLICT = 409,
    PRECONDITION_FAILED = 412,
    VALIDATION_ERROR = 422,
    SERVER_ERROR = 500
}

class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    constructor(statusCode: number, data: any, message: string = 'Success') {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default ApiResponse;
