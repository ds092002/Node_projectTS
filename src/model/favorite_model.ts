import mongoose, { Schema, Document, mongo} from "mongoose";

const favoriteSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
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

const favoriteModel = mongoose.model('favorites', favoriteSchema);
export default favoriteModel;