import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import getExpenses from "./expensesRoutes";

const router = express.Router();

router.use("/", dashboardRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/expenses", getExpenses);

export default router;
