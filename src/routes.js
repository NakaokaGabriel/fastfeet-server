import { Router } from 'express';
import multer from 'multer';
import courierMulter from './config/courierMulter';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AvatarCourierController from './app/controllers/AvatarCourierController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';
import SignatureController from './app/controllers/SignatureController';

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
routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.get('/couriers/:id', CourierController.show);
routes.put('/couriers/:id', CourierController.update);
routes.delete('/couriers/:id', CourierController.destroy);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.destroy);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);

routes.post(
  '/signature',
  upload.single('signature_files'),
  SignatureController.store
);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;
