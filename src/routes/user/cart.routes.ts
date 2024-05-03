import express, { Router} from 'express';
import { userToken } from '../../helpers/userToken'; 

import { 
    addToCart,
    getAllCarts,
    getCart,
    updateCart,
    deleteCart
} from '../../controller/user/cart_controller';

const cartRoutes: Router = Router();

cartRoutes.post('/add-Cart', userToken, addToCart);
cartRoutes.get('/get-All-Cart', userToken, getAllCarts);
cartRoutes.get('/get-Cart', userToken, getCart);
cartRoutes.put('/update-Cart', userToken, updateCart);
cartRoutes.delete('/delete-Cart', userToken, deleteCart);

export default cartRoutes;