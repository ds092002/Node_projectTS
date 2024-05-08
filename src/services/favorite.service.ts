import FavoriteModel from '../../src/model/favorite_model';

export default class FavoriteServices {
    // Add To Favoritelist
    async addToFavorite(body: any) {
        try {
            return await FavoriteModel.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get All Favorite
    async getAllFavorite(query: any) {
        try {
            let find = [
                { $match: { isDelete: false} }
            ];
            let result = await FavoriteModel.aggregate(find);
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Favorite
    async getFavorite(body: any) {
        try {
            return await FavoriteModel.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get Favorite By Id
    async getFavoriteById(id: string) {
        try {
            return await FavoriteModel.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Update Favorite
    async updateFavorite(id: string, body: any) {
        try {
            return await FavoriteModel.findByIdAndUpdate(id, {$set: body},{new: true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
};