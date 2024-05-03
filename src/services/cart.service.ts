import Cart from '../../src/model/cart_model';
import { ObjectId} from 'mongoose';

export default class CartServices {
    static getCart: any;
    static addToCart: any;
    static getAllCarts: any;
    static getCartById: any;
    static updateCart: any;
    static deleteCart: any;
    
    // add to cart
    async addToCart(body: any) {
        try {
            return await Cart.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Single Cart
    async getCart(body: any) {
        try {
            return await Cart.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Single Cart By Id
    async getCartById(id: any) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // update Cart
    async updateCart(body: any, id: string) {
        try {
            return await Cart.findByIdAndUpdate(id, { $set: body}, {new: true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // update Many
    async updateMany(user: any, body: any) {
        try {
            return await Cart.updateMany({ user: user} ,{ $set: body}, {new: true})
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get All Carts
    async getAllCarts( query: any, user: any) {
        try {
            let userCarts = query.me && query.me === 'true' ? [
                {
                    $match: {user: user._id }
                }
            ] : [];
            let find = [
                { $match: {isDelete: false } },
                ...userCarts,
                {
                    $lookup: {
                        from: 'products',
                        localField: 'cartItem',
                        foreignField: '_id',
                        as: 'cartItem'
                    }
                },
                { $set: { "cartItem:" : { $first: "$cartItem" } } }
            ];
            let result = await Cart.aggregate(find);
            return result;
        } catch (error : any) {
            console.log(error);
            return error.message;
        }
    };
}