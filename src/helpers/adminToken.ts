import userModel from '../../src/model/user_model';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    export interface Request {
        admin: any
    }
    export interface Response {
        admin: any
    }
}

export const adminToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            return res.json({ message: `Invalid Authorization ${console.error()}` });
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: `Unauthorized ${console.error()}` });
        }else{
            const payLoad: any = jwt.verify(token,'admin');
            console.log(payLoad.adminId);
            
            const adminId = payLoad.adminId;
            const admin = await userModel.findById(adminId);
            console.log(admin);
            if (admin) {
                req.admin = admin;
                next();
            } else {
                return res.status(401).json({ message: `Invalid Admin (token) ${console.error()}` });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Server Error From Admin Token` });
    }
}
