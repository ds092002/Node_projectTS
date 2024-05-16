import Express from 'express';
import { userToken } from '../../helpers/userToken';
import {
    addReview,
    getAllReview,
    updateReview,
    deleteReview
} from '../../controller/user/review.controller';

const reviewRoutes = Express.Router();

reviewRoutes.post('/add-Review', userToken, addReview);
reviewRoutes.get('/get-All-Review', userToken, getAllReview);
reviewRoutes.put('/update-Review', userToken, updateReview);
reviewRoutes.delete('/delete-Review', userToken, deleteReview);

export default reviewRoutes;