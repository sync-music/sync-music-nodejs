import { acitveUser, registerUser } from '../services/user';
import { Request, Response } from '../services/Router';
import ApiError from '../errors/ApiError';

export const postRegisterUser = async (req: Request, res: Response): Promise<void> => {
    await registerUser(req.user, req.idToken);
    res.status(201).json({});
};

export const getFirebaseAction = async (req: Request, res: Response): Promise<void> => {
    const { oobCode, mode } = req.query;

    switch (mode) {
    case 'verifyEmail':
        await acitveUser(oobCode as string);
        res.status(201).json({});
        break;
    default:
        throw new ApiError('UNIMPLEMENTED_ACTiON');
    }
};
