import {
    Router as ExpressRouter, Request as ExpressRequest, Response as ExpressResponse, Handler,
} from 'express';
import { auth } from 'firebase-admin/lib/auth';
import DecodedIdToken = auth.DecodedIdToken;

export interface Request extends ExpressRequest {
    user: DecodedIdToken;
    idToken: string;
}
export type Response = ExpressResponse;

export type RouterFunction = (req: Request, res: Response) => void;
export type ExpressFunction = (req: ExpressRequest, res: ExpressResponse) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorType = { code: string, data?: any };

export default class Router {
    private readonly expressRouter: ExpressRouter;

    constructor() {
        this.expressRouter = ExpressRouter();
    }

    private executeFunction = (callback: RouterFunction): RouterFunction => (req: Request, res: Response) => {
        try {
            callback(req, res);
        } catch (e) {
            const json: ErrorType = { code: e.code };

            if (e.data) {
                json.data = e.data;
            }

            res.status(e?.statusCode ?? 400).json(json);
        }
    }

    post = (endpoint: string, middlewares: Handler[] = [], callback: RouterFunction): void => {
        this.expressRouter.post(endpoint, middlewares, callback as ExpressFunction);
    }

    get = (endpoint: string, middlewares: Handler[] = [], callback: RouterFunction): void => {
        this.expressRouter.get(endpoint, middlewares, callback as ExpressFunction);
    }

    delete = (endpoint: string, middlewares: Handler[] = [], callback: RouterFunction): void => {
        this.expressRouter.delete(endpoint, middlewares, callback as ExpressFunction);
    }

    router = (): ExpressRouter => this.expressRouter;
}
