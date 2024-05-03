import express from 'express';
import {
    getAllProduct,
    getProduct
} from '../../controller/user/product_controller';

const productRoutes = express.Router();

productRoutes.get('/get-All-Products', getAllProduct);
productRoutes.get('/get-Product', getProduct);

export default productRoutes;