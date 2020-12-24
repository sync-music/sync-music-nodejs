import { Application, Router } from 'express';
import middlewares from './services/middlewares';
import { postRegisterUser } from './controllers/userController';

const publicRouter: Router = Router();

const router = (): Router => publicRouter;

publicRouter.post('/register', [middlewares.isAuthenticated], postRegisterUser);

export const useRouters = (app: Application): void => {
    app.use('/api', router());
};
