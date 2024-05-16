import ReviewServices from "../../services/review.service";
import { Request, Response} from 'express';

const reviewService = new ReviewServices();

export const getAllReview = async (req: Request, res: Response) => {
    try {
        let reviews = await reviewService.getAllReview({ isDelete: false});
        if(!reviews) {
            return res.status(404).json({ message: `This Reviews Not Found........`});
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});        
    }
};

export const deleteReview = async ( req: Request, res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.reviewId);
        if (!review) {
            return res.status(404).json({ message: `This Review Does Not Exists!....`});
        }
        review = await reviewService.deleteReview(review._id);
        res.status(200).json({ message: `The Product review has been deleted successfully.....`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error....${console.error()}`});
    }
};