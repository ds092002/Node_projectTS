import express from "express";
import { userToken } from '../../helpers/userToken';
import { 
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile,
    changePassword
} from '../../controller/user/user_controller';
const userRoutes = express.Router();

userRoutes.post("/register-user", registerUser);
userRoutes.post("/login-user", loginUser);
userRoutes.get("/get-profile", userToken, getProfile);
userRoutes.put("/update-profile",userToken, updateProfile);
userRoutes.delete("/delete-profile",userToken, deleteProfile);
userRoutes.put("/change-password",userToken, changePassword);

export default userRoutes;