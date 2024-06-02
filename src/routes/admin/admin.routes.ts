import express from 'express';
import {adminToken } from "../../helpers/adminToken";
import {
    registerAdmin,
    loginAdmin,
    getAllProfile,
    getProfile,
    updateProfile,
    deleteProfile,
    changePassword
} from "../../controller/admin/admin_controller"
const adminRoutes = express.Router();

adminRoutes.post("/register-admin", registerAdmin);
adminRoutes.post("/login-admin", loginAdmin);
adminRoutes.get("/get-All-profile", adminToken, getAllProfile);
adminRoutes.get("/get-profile", adminToken, getProfile);
adminRoutes.put("/update-profile", adminToken, updateProfile);
adminRoutes.delete("/delete-profile", adminToken, deleteProfile);
adminRoutes.put("/change-password", adminToken, changePassword);

export default adminRoutes