import mongoose, { Schema, Document} from "mongoose";

interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    category: string[];
    isDelete: Boolean
}

const productSchema: Schema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: [{
        type: String
    }],
    isDelete: {
        type: Boolean,
        default: false
    }    
},
{
    versionKey: false,
    timestamps: true
});

const productModel = mongoose.model<IProduct>('products', productSchema);

export default productModel;