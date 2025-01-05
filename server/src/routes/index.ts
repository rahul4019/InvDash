import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import productRoutes from "./productRoutes";

const router = express.Router();

router.use("/", dashboardRoutes);
router.use("/product", productRoutes);

export default router;
