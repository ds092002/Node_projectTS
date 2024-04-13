import Userservice from "../../services/user.service";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PassThrough } from "stream";
import { log } from "console";

const userService = new Userservice();

declare global {
    namespace Express {
        interface Request {
            user?: object;
        }
    }
}

// Register User
export const registerUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUser({
            email: req.body.email,
            isDelete: false,
        });
        console.log(user);
        if (user) {
            return res.status(400).json({ message: `User Is Already Registerd...`});
        }
        let hashPassword: string = await bcryptjs.hash(req.body.password, 10);
        console.log(hashPassword);
        user = await userService.addNewUser({
            ...req.body,
            password: hashPassword,
        });
        res.status(201).json({ user: user, message: `Register SuccessFully....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUser({
            email: req.body.email,
            isDelete: false,
        });
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: `Email Not Found...Please Check Your Email Address...`});
        }
        let checkPassword = await bcryptjs.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(404).json({ message: `Please Check The Password Password Does Not Match....`});
        }
        let token: string = jwt.sign({ userId: user._id}, 'dhaval');
        console.log(token);
        res.status(200).json({ token, message: `Login SuccessFully.....`}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Get Profile
export const getProfile = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}



