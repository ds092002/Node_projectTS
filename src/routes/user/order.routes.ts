import express from 'express';
import { userToken } from '../../helpers/userToken';
import { 
    addNewOrder,
    getAllOrders,
    getOrder,
    deleteOrder
} from '../../controller/user/order_controller';

const orderRoutes = express.Router();

orderRoutes.post('/add-NewOrder', userToken, addNewOrder);
orderRoutes.get('/get-All-Orders', userToken, getAllOrders);
orderRoutes.get('/get-Order', userToken, getOrder);
orderRoutes.delete('/delete-Order', userToken, deleteOrder);

export default orderRoutes;