import productModel from "../../src/model/product_model";

export default class productSevice{
    // add product
    addNewProduct = async (body:any) => {
        return await productModel.create(body);
    }
    // get all product
    getAllProduct = async (body: any) => {
        return await productModel.find(body);
    }
    // get one product by id
    getProductById = async (body: any) => {
        return await productModel.findById(body)
    }
    // get product  
    getProduct = async (body: any) => {
        return await productModel.findOne(body);
    }
    // update product
    updateProduct = async (body: any, id: string) => {
        return await productModel.findByIdAndUpdate(id, { $set: body}, { new: true});
    }
    // delete product
    deleteProduct = async (id: string, body: any) => {
        return await productModel.findByIdAndDelete(id, { new: true});
    }
}