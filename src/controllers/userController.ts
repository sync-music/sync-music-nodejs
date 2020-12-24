import { Request, Response } from 'express';
import { registerUser } from '../services/user';

export const postRegisterUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // @ts-ignore
        await registerUser(req.user);
        res.status(201).send();
    } catch (e) {
        res.status(e.statusCode).json({ code: e.code });
    }
};
