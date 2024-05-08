import express from 'express';
import { userToken } from '../../helpers/userToken';
import {
    addToFavorite,
    getAllFavorite,
    deleteFavorite
} from '../../controller/user/favorite_controller';

const favoriteRoutes = express.Router();