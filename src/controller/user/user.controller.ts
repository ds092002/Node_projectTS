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
        let token: string = jwt.sign({ userId: user._id}, 'user');
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
        let user = await userService.getUserById(req.query.userId);
        if (!user) {
            return res.status(404).json({ mesaage: `User Not Found...`});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Update User
export const updateProfile = async (req: Request, res:Response) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if (!user) {
            return res.status(404).json({ mesaage: `User Not Found...`});
        }
        user = await userService.updateUser(user._id, {...req.body});
        res.status(201).json({ user: user, message: `Profile Update SuccessFully.....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error...${console.error()}`});
    }
};

// Delete User
export const deleteProfile = async (req: Request, res: Response) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if (!user) {
            return res.status(404).json({ message: `This Profile Not Found...`});
        }
        user = await userService.updateUser(user._id,{ isDelete: true });
        res.status(200).json({ user: user, message: `User Profile Deleted SuccessFully.....`})
    } catch (error) {
        
    }
};

// Update Password
export const changePassword = async (req: Request, res: Response) => {
    try {
        let user;
        let { password, newPassword, confirmPassword } = req.body;
        let checkPassword: Object = await bcryptjs.compare(password, req.admin.password);
        if (!checkPassword) {
            return res.status(404).json({ message: `Incorrect Current Password..`});
        }
        if (newPassword !== confirmPassword) {
            return res.json({ message: `New Password And Confirm Password Do not Match......`});
        }
        let hashPassword = await bcryptjs.hash(confirmPassword, 10);
        user = await userService.updateUser(user._id , {password: hashPassword})
        res.status(200).json({ user: user, message: `Password Update SuccesFully....`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}` });
    }
}



