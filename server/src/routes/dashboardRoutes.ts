import express from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

const router = express.Router();

router.get("/dashboard", getDashboardMetrics);

export default router;
