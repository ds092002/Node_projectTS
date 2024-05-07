import express from 'express';
import adminRoute from '../admin/admin.routes';
import productRoute from '../admin/product.routes';
import cartRoute from '../admin/cart.routes';
import orderRoute from '../admin/order.routes';
const admin = express.Router();

admin.use('/user-admin', adminRoute);
admin.use('/product', productRoute);
admin.use('/cart', cartRoute);
admin.use('/order', orderRoute);

export default admin;