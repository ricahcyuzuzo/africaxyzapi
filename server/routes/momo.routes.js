import express from 'express';
import MomoPayController from '../controllers/momo.controller';

const routes = express();

routes.post('/paymomo', MomoPayController.InitiatePayment);

export default routes;
