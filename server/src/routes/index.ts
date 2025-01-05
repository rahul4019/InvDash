import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import productRoutes from "./productRoutes";

const router = express.Router();

router.use("/", dashboardRoutes);
router.use("/products", productRoutes);

export default router;
