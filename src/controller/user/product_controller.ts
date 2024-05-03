import { Request, Response} from 'express';
import ProductService from '../../services/product.service';

const productService = new ProductService();

declare global {
    namespace Express {
        interface Request {
            product?: any;
        }
        interface Response {
            product?: any;
        }
    }
}

// Get All Product
export const getAllProduct = async ( req: Request, res: Response) => {
    try {
        let products = await productService.getAllProduct({isDelete: false});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get Product
export const getProduct = async (req: Request, res: Response) => {
    try {
        let product = await productService.getProductById(req.query.productId);
        if( product === undefined || product === null) {
            return res.status(404).json({ message: `This Product is not found....`});
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}