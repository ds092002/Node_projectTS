import mongoose, {Schema, Document} from "mongoose";

const cartSchema : Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        default: 1
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},
{
    versionKey: false,
    timestamps: true
});

const cartModel = mongoose.model('carts', cartSchema);
export default cartModel;