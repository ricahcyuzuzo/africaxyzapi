import express from 'express';
import CardController from '../controllers/cardpay.controller';

const routes = express();

routes.post('/cardpay', CardController.chargeTheCard);

export default routes;