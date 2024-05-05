import { Request, Response} from 'express';
import CartServices from '../../services/cart.service';

const cartServices = new CartServices();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
        interface Response {
            admin?: object | undefined;
        }
    }
}

// Get ALL Carts
export const getAllCarts = async (req: Request, res: Response) => {
    try {
        let carts = await cartServices.getAllCarts(
            { admin: (req.admin as any)._id, isDelete: false },
            (req.admin as any)._id
        );        
        res.status(200).json(carts);
        console.log(carts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error....`})
    }
};