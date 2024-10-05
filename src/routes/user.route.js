import { Router } from "express";

import {
    register,
    login,
    logout,
    getCurrentUser,
    editProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser);
router.put("/edit-profile", protectRoute, editProfile);

export default router;
