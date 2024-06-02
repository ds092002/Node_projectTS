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

// Get All Order
export const getAllOrders = async ( req: Request, res: Response) => {
    try {
        let orders = await orderServices.getAllOrder({ isDelete: false});
        console.log(orders);
        if (!orders) {
            res.status(404).json({ message: `Orders Not Found....`});
        }
        res.status(200).json(orders);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error.message}` });        
    }
};

// Get Order By Id
export const getOrder = async ( req: Request, res: Response) => {
    try {
        let order = await orderServices.getOrderById({_id: req.query.orderId, isDelete: false});
        console.log(order);
        if (!order) {
            return res.status(404).json({ message: `Order Not Found....`})
        }
        res.status(200).json(order)
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error.message}` });
    }
};

// Delete Order
export const deleteOrder = async ( req: Request, res: Response) => {
    try {
        let order = await orderServices.getOrder({_id: req.query.orderId, isDelete: false});
        console.log(order);
        if (!order) {
            res.status(404).json({ message: `Order Not Found....`})
        }
        order = await orderServices.deleteOrder(order._id, {new : true});
        res.status(200).json({ message: `Your Order Deleted Succesfully.....`});
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: `Internal Server Error ${error.message}` });
    }
};
