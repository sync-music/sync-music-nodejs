import { Application } from 'express';
import middlewares from './services/middlewares';
import { getFirebaseAction, postRegisterUser } from './controllers/userController';
import Router from './services/Router';

const router = new Router();

router.post('/register', [middlewares.isAuthenticated], postRegisterUser);
router.get('/firebase/actions', [], getFirebaseAction);

export const useRouters = (app: Application): void => {
    app.use('/api', router.router());
};
