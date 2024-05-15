import { timeStamp } from "console";
import { version } from "os";

const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    },   
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    comment:{
        type: String,
    },
    isDelete:{
        type: Boolean,
        default: false
    } 
},
{
    versionKey: false,
    timeStamp: true
});

const reviewModel = mongoose.model('reviews', reviewSchema);

export default reviewModel;