import { Request, Response } from "express";
import FavoriteService from "../../services/favorite.service";
import { json } from "stream/consumers";

const favoriteService = new FavoriteService();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Add To Favorite
export const addToFavorite = async ( req: Request, res: Response) =>{
    try {
        let favorite = await favoriteService.getFavorite({
            product: req.body.product,
            user: (req.user as any)._id,
            isDelete: false
        });
        console.log(favorite);
        if (favorite) {
            return res.status(400).json({ message: `Product is Already In your Favorite list..`});
        }
        favorite = await favoriteService.addToFavorite({
            ...req.body,
            user: (req.user as any)._id,
        });
        return res.status(201).json({ favorite, message: `Product added to your favorite list succesfully.`});
    } catch (error: any) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

// Get All Favorite
export const getAllFavorite = async ( req: Request, res: Response) => {
    try {
        let favorite = await favoriteService.getAllFavorite(req.query);
        res.status(200).json(favorite);
    } catch (error: any) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

// Delete Favorite
export const deleteFavorite = async ( req: Request, res: Response) => {
    try {
        let favorite = await favoriteService.getAllFavorite(req.query.favoriteId);
        if (!favorite) {
            return res.status(404).json({ message: `Your Favorite Items Is Not Found...`});
        }
        console.log(favorite);
        favorite = await favoriteService.updateFavorite(favorite._id,{isDelete: true});
        res.status(201).json({favorite, message: `Favorite Item Is Deleted SuccessFully...`});
    } catch (error: any) {
        console.log(error);
        res.status(401).json({ message: `Internal Server Error... ${console.error()}`});
    }
};