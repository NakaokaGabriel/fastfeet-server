import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import Recipient from './app/models/Recipient';

import sessionAuthorizationMiddleware from './app/middlewares/sessionAuthorization';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(sessionAuthorizationMiddleware);

routes.get('/recipients', async (req, res) => {
  const recipient = await Recipient.findAll();

  return res.json(recipient);
});

export default routes;
