import { Request, Response } from "express";
import FavoriteService from "../../services/favorite.service";

const favoriteService = new FavoriteService();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const addToFavorite = async ( req: Request, res: Response) =>{
    try {
        
    } catch (error) {
        
    }
}