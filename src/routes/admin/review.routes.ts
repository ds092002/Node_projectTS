import Express from "express";
import {  adminToken } from '../../helpers/adminToken';
import {
    getAllReview,
    deleteReview
} from '../../controller/admin/review_controller';

const reviewRoutes = Express.Router();

reviewRoutes.get('/get-All-Review', adminToken, getAllReview);
reviewRoutes.delete('/delete-Review', adminToken, deleteReview);

export default reviewRoutes; 