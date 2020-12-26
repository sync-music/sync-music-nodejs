export default class ApiError extends Error {
    private statusCode: number;

    private code: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private data?: any;

    constructor(code = 'UNEXPECTED_ERROR', statusCode = 400, data = null) {
        super(code);

        this.code = code;
        this.statusCode = statusCode;
        this.data = data;
    }
}
