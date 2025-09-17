import { Router } from "express";
import { getFinance } from "../controllers/financeController.js";
import requiredAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.use(requiredAuth());

router.get("/", getFinance);

export default router;
