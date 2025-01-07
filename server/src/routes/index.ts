import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.use("/", dashboardRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
