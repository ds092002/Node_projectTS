import { Request, Response } from "express";
import ProductService from "../../services/product.service";
import { title } from "process";

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

// Add new Product
export const addNewProduct = async ( req: Request , res: Response) => {
    try {
        let product : object | null = await productService.getProduct({ title: req.body.title, isDelete: false});
        if (product) {
            return res.status(400).json({ message: `Product is already Added....`})
        }
        product = await productService.addNewProduct({...req.body });
        res.status(201).json({product, message: `Product Added Successfully....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
} 

// Get All Product
export const getAllProduct = async ( req: Request, res: Response) =>  {
    try {
        let products = await productService.getAllProduct(req.query);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


