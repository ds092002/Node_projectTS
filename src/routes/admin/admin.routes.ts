import express from 'express';
import {adminToken } from "../../helpers/adminToken";
import {
    registerAdmin,
    loginAdmin,
    getProfile,
    updateProfile,
    deleteProfile,
    changePassword
} from "../../controller/admin/admin_controller"
const adminRouter = express.Router();

adminRouter.post("/register-admin", registerAdmin);
adminRouter.post("/login-admin", loginAdmin);
adminRouter.get("/get-profile", adminToken, getProfile);
adminRouter.put("/update-profile", adminToken, updateProfile);
adminRouter.delete("/delete-profile", adminToken, deleteProfile);
adminRouter.put("/change-password", adminToken, changePassword);

export default adminRouter