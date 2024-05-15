import { query } from "express";
import reviewModel from "../../src/model/review_model";
import mongoose from 'mongoose';

export default class ReviewServices {
    // Add Review
    addNewReview = async (body:any) => {
        return await reviewModel.create(body);
    };

    // Get All Review
    getAllReview = async ( query: any) => {
        let product = query.productId && query.productId !== "" ? [
            {
                $match:{ product: new mongoose.Types.ObjectId(query.productId)}
            }
        ] : [];
        let find = [
            { $match: { isDelete: false} },
            ...product
        ];

        let result = await reviewModel.aggregate(find);
        return result;
    }

    // Get Specific Review
    getReview = async (body: any ) => {
        return await reviewModel.findOne(body);
    };

    // Get Specific Review By Id
    getReviewById = async (body:any) => {
        return await reviewModel.findById(body);
    }

    // Update Review
    updateReview = async (id: string, body: any ) => {
        return await reviewModel.findByIdAndUpdate(id, { $set : body}, { new: true });
    }

    // Delete Review
    deleteReview = async (id: string) => {
        return await reviewModel.findByIdAndUpdate(id, { $set : { isDelete: true}}, { new: true });
    }
}