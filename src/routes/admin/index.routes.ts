import express from 'express';
import adminRoute from '../admin/admin.routes'

const admin = express.Router();

admin.use('/user-admin', adminRoute);

export default admin;