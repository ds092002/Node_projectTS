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
    } catch (error) {
        
    }
}

