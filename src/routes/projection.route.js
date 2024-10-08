import { Router } from "express";
import { createProjection, getAllProjections } from "../controllers/projection.controller.js";

const router = Router();

router.get("/", getAllProjections);
router.post("/", createProjection);

export default router;
