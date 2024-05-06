import OrderServices from "../../services/order.service";
import CartServices from "../../services/cart.service";
import { Request, Response } from "express";

const orderServices = new OrderServices();
const cartServices = new CartServices();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }  
}

export const addNewOrder = async (req: Request, res: Response) => {
    try {

        let cartItems = await cartServices.getAllCarts(req.query, req.user);
        // console.log(cartItems);
        if (cartItems.length === 0) {
            return res.status(404).json({ message: `Cart Not Found....`});
        }
            //   console.log(cartItems);
        let orderItems = cartItems.map((item: any) => ({
            product: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }));
            console.log(orderItems);
        let totalPrice = orderItems.reduce((total: number, item: any) => (total + (item.price * item.quantity)), 0);
        
        let newOrder = await orderServices.addToOrder({
            user: req.user,
            items: orderItems,
            totalAmount: totalPrice
        });
        // console.log(newOrder);
        await cartServices.updateMany(req.user, { isDelete: true });
        
        return res.status(201).json({ newOrder, message: `Order Place Successfully` });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error.message}` });
    }
};
