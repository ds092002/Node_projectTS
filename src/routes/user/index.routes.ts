import express from 'express';
import userRoute from '../user/user.routes';
import productRoute from '../user/product.routes';
import cartRoute from '../user/cart.routes';
import orderRoute from '../user/order.routes';

const user = express.Router();

user.use('/user', userRoute);
user.use('/product', productRoute);
user.use('/cart', cartRoute);
user.use('/order', orderRoute);

export default user;