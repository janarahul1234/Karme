import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requiredAuth());

router.get("/", getDashboard);

export default router;