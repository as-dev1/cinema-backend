import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    getUserCart,
    getUserReservation,
    createReservation,
    cancelReservation,
    markAsViewed,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", protectRoute, getUserCart);
router.get("/reservation", protectRoute, getUserReservation);
router.post("/", protectRoute, createReservation);
router.put("/cancel/:cartId", protectRoute, cancelReservation);
router.put("/viewed/:cartId", protectRoute, markAsViewed);

export default router;
