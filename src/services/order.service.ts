import orderModel from '../../src/model/order_model';

export default class OrderServices {
    // Add Order
    addOrder = async (body: any) => {
        return await orderModel.create(body);
    }

    // Get All Order
    getAllOrder = async (body: any) => {
        return await orderModel.find(body);
    }

    // Get Specific order
    getOrder = async (body: any) => {
        return await orderModel.findOne(body);
    }

    // Get Specific Order by Id
    getOrderById = async (body: any) => {
        return await orderModel.findById(body);
    }

    // Update Order
    updateOrder = async (body: any, id: string) => {
        return await orderModel.findByIdAndUpdate(id, {$set: body}, { new: true});
    }
    
    // Delete Order
    deleteOrder = async (id: string, body: any) => {
        return await orderModel.findByIdAndDelete(id, {new: true}, { isDelete: true});
    }

    // Update Many
    updateMany = async (body: any) => {
        return await orderModel.updateMany(body, { $set: body}, { isDelete: true });
    }
    
    async addToOrder(body: any) : Promise<any> {
        try {
            return await orderModel.create(body);
        } catch (error: any) {
            console.log(error);
            return error.message; 
        }
    }
}