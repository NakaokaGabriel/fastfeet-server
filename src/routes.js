import { Router } from 'express';
import multer from 'multer';
import courierMulter from './config/courierMulter';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AvatarCourierController from './app/controllers/AvatarCourierController';

import sessionAuthorizationMiddleware from './app/middlewares/sessionAuthorization';

const upload = multer(courierMulter);

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(sessionAuthorizationMiddleware);

routes.post(
  '/courier_avatar',
  upload.single('courier_file'),
  AvatarCourierController.store
);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);

export default routes;
