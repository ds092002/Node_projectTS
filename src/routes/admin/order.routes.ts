import express from 'express';
import { adminToken } from '../../helpers/adminToken';
import {
    getAllOrder
 } from '../../../src/controller/admin/order_controller';

 const orderRoutes = express.Router();

 orderRoutes.get('/get-All_Orders', adminToken, getAllOrder);

 export default orderRoutes;