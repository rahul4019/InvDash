import express from "express";
import dashboardRoutes from "./dashboardRoutes";

const router = express.Router();

router.use("/", dashboardRoutes);

export default router;
