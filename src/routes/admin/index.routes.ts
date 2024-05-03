import express from 'express';
import adminRoute from '../admin/admin.routes';
import productRoute from '../admin/product.routes';
import cartRoute from '../admin/cart.routes';
const admin = express.Router();

admin.use('/user-admin', adminRoute);
admin.use('/product', productRoute);
admin.use('/cart', cartRoute);

export default admin;