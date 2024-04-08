import express from 'express';
import adminRoute from './admin.routes';

const admin = express.Router();

admin.use('/', adminRoute);

export default admin;