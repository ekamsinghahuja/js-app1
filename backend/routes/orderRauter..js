import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listFood, placeOrder } from '../controller/ordercontriller.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.get('/list',listFood);

export default orderRouter