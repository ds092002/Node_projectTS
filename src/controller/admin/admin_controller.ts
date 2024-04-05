import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Userservice from '../../services/user_services';
const  userservice = new Userservice();

declare global {
    namespace Express {
        interface Request {
            admin?: any;
        }
    }
}

export const registerAdmin = async (req: Request, res: Response) => {
    try {
        let { firstName, lastName, email, password,confirmPassword, gender, profileImage, mobileNo} = req.body;
        let admin = await userservice.getUser({email: req.body.email, isDelete: false});
        if (admin) {
            return res.json({message: "Email Alreday  Exists"}).status(409);
        }
        if(password !== confirmPassword){
            return res.json({ message: `Passwords Do Not Match.`});
        }
        const hashPassword = await bcryptjs.hash(confirmPassword, 8);
        
        let filePath: any;
        if (req.file) {
            filePath = `${req.file.path}`;
        }
        admin = await userservice.addNewUser({
            ...req.body,
            password: hashPassword,
            confirmPassword: hashPassword,
            profileImage: filePath
        });
        admin.save();
        res.status(201).json({ message: `Admin Registered Successfully` });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const loginAdmin = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body;
        let admin = await userservice.getUser({email: req.body.email, isDelete: false});
        if (!admin) {
            return res.json({ message: `Admin Does Not Exist.`});
        }
        let checkPassword = await bcryptjs.compare(password, admin.password);
        if(!checkPassword){
            return res.status(404).json({message:"Invalid Password"});
        }
        let playload = {
            adminId: admin._id,
        }
        let secretKey: string | undefined = process.env.SECRET_KEY
        if (playload && secretKey) {
            let token = jwt.sign(playload, secretKey);
            res.json({ token, message: `Login Successfully`})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        res.json(req.admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const  updateProfile = async (req: Request, res: Response) => {
    try {
        // let filePath: any;
        // if (!req.file) {
        //     filePath = `${req.file.path}`
        // }
        console.log(req.admin._id);
        
        let admin = await userservice.updateUser
    } catch (error) {
        
    }
}