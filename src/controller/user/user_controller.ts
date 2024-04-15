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
            user?: object | any;
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
        // Retrieve the password, new password, and confirm password from the request body
        let { password, newPassword, confirmPassword } = req.body;

        // Retrieve the user object from the user service using the user's ID
        let user: any = await userService.getUserById(req.user._id);

        // Check if the user exists
        if (!user) {
            return res.json({ message: 'User Not Found. Please Try Again.' });
        }

        // Compare the current password with the password stored in the user object
        let comparePassword: boolean = await bcryptjs.compare(
            req.body.oldPassword, 
            user.password
        );

        // Check if the current password is incorrect
        if (!comparePassword) {
            return res.status(404).json({ message: 'Incorrect Current Password.' });
        }

        // Check if the new password is the same as the old password
        if (req.body.newPassword === req.body.oldPassword) {
            return res.json({ message: 'Old Password And New Password Are Same. Please Enter a Different Password.' });
        }

        // Check if the new password and confirm password match
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.json({ message: 'New Password And Confirm Password Do Not Match.' });
        }

        // Hash the new password
        let hashPassword = await bcryptjs.hash(req.body.newPassword, 10);

        // Update the user's password in the user service
        user = await userService.updateUser(user._id, { password: hashPassword });

        // Return the updated user object and a success message
        res.status(200).json({ user, message: 'Password Update Successful.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
}


