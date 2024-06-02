import userModel from '../../src/model/user_model'
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    export interface Request {
        user: any;
    }
    export interface Response {
        user: any;
    }
}

export const userToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if(authorization === undefined) {
            return res.json({ message: `Invalid Authorization ${console.error()}` });

        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: `Unauthorized ${console.error()}`});
        }else{
            const payLoad: any = jwt.verify(token, 'user');
            // console.log(payLoad.userId);
            const userId = payLoad.userId;
            const user = await userModel.findById(userId);
            // console.log(user);
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: `Invalid User (token) ${console.error()}` });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Server Error From User Token` });    }
}
