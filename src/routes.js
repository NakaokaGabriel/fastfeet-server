import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import sessionAuthorizationMiddleware from './app/middlewares/sessionAuthorization';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(sessionAuthorizationMiddleware);

routes.get('/recipient', (req, res) => {
  return res.json({ ok: true });
});

export default routes;
