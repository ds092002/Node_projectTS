import express from 'express';
import { userToken } from '../../helpers/userToken';
import {
    addToFavorite,
    getAllFavorite,
    deleteFavorite
} from '../../controller/user/favorite_controller';

const favoriteRoutes = express.Router();

favoriteRoutes.post('/addToFavorite', userToken, addToFavorite);
favoriteRoutes.get('/get-All-Favorite', userToken, getAllFavorite);
favoriteRoutes.delete('/delete-Favorite', userToken, deleteFavorite);

export default favoriteRoutes;
