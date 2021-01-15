import { Application } from 'express';
import middlewares from './services/middlewares';
import { getFirebaseAction, postActiveUser, postRegisterUser } from './controllers/userController';
import Router from './services/Router';
// @ts-ignore
import appleAppSiteVerification from '../apple-app-site-association.json';

const router = new Router();

router.post('/user/register', [middlewares.isAuthenticated], postRegisterUser);
router.post('/user/active', [middlewares.isAuthenticated], postActiveUser);
router.get('/firebase/actions', [], getFirebaseAction);

const baseRouter = new Router();

baseRouter.get('/apple-app-site-association', [], (_, res) => {
    res.json(appleAppSiteVerification);
});

export const useRouters = (app: Application): void => {
    app.use('/api', router.router());
    app.use('/', baseRouter.router());
};
