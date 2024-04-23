import express from 'express';
import adminRoute from '../admin/admin.routes'
import productRoute from '../admin/product.routes'
const admin = express.Router();

admin.use('/user-admin', adminRoute);
admin.use('/product', productRoute);

export default admin;