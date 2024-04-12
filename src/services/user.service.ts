import usermodel from '../model/user_model';

export default class Userservice{
    addNewUser = async (body:any) => {
        return await usermodel.create(body);
    }

    getAllUser = async (body:any) => {
        return await usermodel.find(body);
    }

    getUser = async (body:any) => {
        return await usermodel.findOne(body);
    }

    getUserById = async (body:any) => {
        return await usermodel.findById(body);
    }

    updateUser = async (id:string, body:any) => {
        return await usermodel.findByIdAndUpdate(id, {$set: body}, {new: true})
    }
}