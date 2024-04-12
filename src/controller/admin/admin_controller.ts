import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Userservice from '../../services/user_services';
const  userservice = new Userservice();
const key = process.env.SECRET_KEY;

declare global {
    namespace Express {
        interface Request {
            admin?: object | any;
        }
    }
}

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, email, password,confirmPassword, gender, profileImage, mobileNo} = req.body;
        let admin : object | any= await userservice.getUser({
            email: req.body.email, 
            isDelete: false
        });
        console.log(admin);
        if (admin) {
            return res.json({message: "Email Alreday  Exists"}).status(409);
        }
        if(password !== confirmPassword){
            return res.json({ message: `Passwords Do Not Match.`});
        }
        const hashPassword = await bcryptjs.hash(confirmPassword, 8);
        
        // let filePath: any;
        // if (req.file) {
        //     filePath = `${req.file.path}`;
        // }
        admin = await userservice.addNewUser({
            ...req.body,
            isAdmin: true,
            password: hashPassword,
            confirmPassword: hashPassword,
            // profileImage: filePath
        });
        // admin.save();
        res.status(201).json({ message: `Admin Registered Successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const loginAdmin = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        let admin = await userservice.getUser({
            email: req.body.email, 
            isDelete: false
        });
        console.log(admin);
        if (!admin) {
            return res.status(404).json({ message: `Admin Does Not Exist.`});
        }
        let checkPassword = await bcryptjs.compare(password, admin.password);
        if(!checkPassword){
            return res.status(401).json({message:"Invalid Password"});
        }
        let token : string = jwt.sign({ adminId: admin._id}, "Admin")
        console.log(token);
        res.status(200).json({ token, message: `Login SucccessFully......`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        let admin = await userservice.getUserById()
        // res.json(req.admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getAllProfile = async (req: Request, res: Response) => {
    try {
        let admin = await userservice.getAllUser({
            isAdmin : true,
            isDelete: false
        });
        console.log(admin);
        if (!admin) {
            return res.status(404).json({ message:  `Admin Data Not Found..`})
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}
export const updateProfile = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, email, profileImage } = req.body;

        let filepath: any;
        if (req.file) {
            filepath = req.file.path;
        }
        let admin = await userservice.updateUser(
            req.admin._id,
            {
                ...req.body,
                profileImage: filepath,
            }
        );
        res.status(200).json({ admin, message: `Profile Changed successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        let admin = await userservice.updateUser(
            req.admin._id,
            {
                isDelete: true
            }
        )
        res.status(200).json({admin, message: `Account Deleted Successfully.`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try {
        let { password, newPassword, confirmPassword } = req.body;
        
        let checkPassword: Object = await bcryptjs.compare(password, req.admin.password);
        
        if (!checkPassword) {
            return res.status(404).json({ message: 'Incorrect current Password' });
        }
        if (newPassword !== confirmPassword){
            return res.json({ message: `New Password and Confirm Password Do not match!` })
        }
        let hashPassword = await bcryptjs.hash(confirmPassword, 10);
        let admin = await userservice.updateUser(
            req.admin._id,
            {
                password: hashPassword,
                confirmPassword: hashPassword
            }
        )
        res.status(200).json({admin, message: `Password updated successfully`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

