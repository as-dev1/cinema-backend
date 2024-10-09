import { Router } from "express";
import { createReview, getReviewForMovie } from "../controllers/review.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:movieId", getReviewForMovie);
router.post("/", protectRoute, createReview);

export default router;
