import usermodel from '../model/user_model';

export default class Userservice{
    addNewUser = async (body:any) => {
        try {
            return await usermodel.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    getAllUser = async (body:any) => {
        try {
            return await usermodel.find(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    getUser = async (body:any) => {
        try {
            return await usermodel.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    getUserById = async (id:string) => {
        try {
            return await usermodel.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    updateUser = async (id:string, body:any) => {
        try {
            return await usermodel.findByIdAndUpdate(id, {$set: body}, {new: true})
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
}