import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controller/cartcontroller.js'
import authMiddleware from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.get("/get",authMiddleware,getCart);

export default cartRouter;