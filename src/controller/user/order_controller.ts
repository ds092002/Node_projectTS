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
    namespace Express {
        interface Response {
            user?: object | undefined;
        }
    }    
}

export const addNewOrder = async ( req: Request, res: Response) => {
    try {
        let cartItems = await cartServices.getAllCarts( req.query, res.user);
        console.log(cartItems);
        if (cartItems.length === 0) {
            return res.status(404).json({ message: `Cart Not Found.....`})
        }
        console.log(cartItems);
        let orderItems = cartItems.map((item: any) => {
            product: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        })
    } catch (error) {
        
    }
}