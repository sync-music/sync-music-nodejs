import { NextFunction, Request, Response } from 'express';
import firebase from './firebase';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;

    try {
        if (!authorization) {
            res.status(401).send();
            return;
        }
        const bearer = authorization.replace(/^Bearer\s/, '');
        // @ts-ignore
        req.user = await firebase.auth().verifyIdToken(bearer);
        // @ts-ignore
        req.idToken = bearer;
        next();
    } catch {
        res.status(401).send();
    }
};

export default {
    isAuthenticated,
};
