import OrderServices from '../../services/order.service';
import CartServices from '../../services/cart.service';
import { Request, Response } from 'express';

const orderServices = new OrderServices();
const cartServices = new CartServices();

// Get All Order

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        let orders = await orderServices.getAllOrder({ isDelete: false});
        console.log(orders);
        if (!orders) {
            res.status(404).json({ message: `Order Not Found.......`})
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};