import ReviewServices from "../../services/review.service";
import { Request, Response } from "express";
const reviewService = new ReviewServices();

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

// Add Review
export const addReview = async ( req: Request, res: Response) => {
    try {
        let review = await reviewService.getReview({
            user: (req.user as any)._id,
            product: req.query.productId,
            isDelete: false
        });
        if (review) {
            return res.status(400).json({ message: `Review Is already exist.....`});
        }
        review = await reviewService.addNewReview({ ...req.body, user: (req.user as any)._id });
        res.status(201).json({ review, message: `Review Is Added....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Get All Review
export const getAllReview = async ( req: Request, res: Response) => {
    try {
        let review = await reviewService.getAllReview(req.query);
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Get Review By Id
export const updateReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: `This Review Does Not exist!....`});
        }
        review = await reviewService.updateReview(review._id, {...req.body});
        res.status(200).json({ review, message: `Product Review Upadet Successfully....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Delete Review
export const deleteReview = async (req: Request, res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: `Review Is Not Found....`});
        }
        review = await reviewService.updateReview(review._id, {isDelete: true});
        res.status(202).json({ review, message: `Review Is Delete.......`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};