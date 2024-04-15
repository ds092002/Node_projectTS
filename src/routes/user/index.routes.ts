import express from 'express';
import userRoutes from '../user/user.routes';

const user = express.Router();

user.use('/user', userRoutes);

export default user;