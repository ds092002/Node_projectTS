import { Request, Response } from "express";
import CartServices from "../../services/cart.service";

const cartServices = new CartServices();

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
        interface Response {
            user?: object | undefined;
        }
    }
}

export const addToCart = async ( req: Request, res: Response) => {
    try {
        let cart = await cartServices.getCart({
            user: (req.user as any)._id,
            cartItem: req.body.cartItem,
            isDelete: false
        });
        if (cart) {
            return res.json({ message: `This Iteam Already In Your Cart List....`});
        }
        cart = await cartServices.addToCart({
            user: (req.user as any)._id,
            ...req.body
        });
        return res.status(201).json({ cart, message :`New Item is Added To your cart list....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// get all cart
export const getAllCarts = async (req: Request, res: Response) => {
    try {
        let carts = await cartServices.getAllCarts(
            { user: (req.user as any)._id, isDelete: false},
            (req.user as any)._id
        );
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// get Cart
export const getCart = async (req: Request, res: Response) => {
    try {
        let cart = await cartServices.getCartById(req.query.cartId as any);
        if (!cart) {
            return res.status(404).json({ message: `No Cart Found with this is ID....`});
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});    
    }
}

// Get Cart
export const updateCart = async (req: Request, res: Response) => {
    try {
        let cart = await cartServices.getCart({_id: req.query.cartId, isDelete: false});
        if (!cart) {
            return res.status(404).json({ message: `No Cart Found with this is ID....`});
        }
        cart = await cartServices.updateCart(cart._id, { ...req.body});
        res.status(200).json({ cart, message: `Cart Item Update SuccessFully....`});
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

// Delete Cart
export const deleteCart = async (req: Request, res: Response) => {
  try {
    let cart = await cartServices.getCart({ _id: req.query.cartId });
    if (!cart) {
      return res
        .status(404)
        .json({ message: `No Cart Found With this ID...` });
    }
    cart = await cartServices.deleteCart(cart._id, {new: true});
    res
      .status(200)
      .json({ cart, message: `Cart Item Delete SuccessFully....` });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: `Internal Server Error... ${console.error()}` });
  }
};