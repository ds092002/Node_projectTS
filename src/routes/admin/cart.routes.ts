import express, { Router } from 'express';
import { adminToken } from '../../helpers/adminToken';
import { 
    getAllCarts
} from '../../controller/admin/cart_controller';

const cartRoutes : Router = Router();

cartRoutes.get('/get-All-Carts', adminToken, getAllCarts);

export default cartRoutes;
