import express from "express";
import {  
    addNewProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
} from "../../controller/admin/product_controller";
import { adminToken } from "../../helpers/adminToken";

const productRoutes = express.Router();

productRoutes.post("/add-product", adminToken, addNewProduct);
productRoutes.get("/get-products", adminToken, getAllProduct);
productRoutes.get("/get-product", adminToken, getProduct);
productRoutes.put("/update-product", adminToken, updateProduct);
productRoutes.delete("/delete-product", adminToken, deleteProduct);

export default productRoutes