import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import sessionAuthorizationMiddleware from './app/middlewares/sessionAuthorization';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(sessionAuthorizationMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);
routes.get('/recipients', RecipientController.index);

export default routes;
