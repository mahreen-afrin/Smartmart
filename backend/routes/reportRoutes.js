import express from "express";
import {
  calculateTotalSales,
  countTotalOrders,
  fetchTopSellingProducts,
  fetchSalesPerCategory,
} from "../controllers/reportController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Sales Reports Endpoints for Managers
router.route("/total-sales").get(authenticate, authorizeAdmin, calculateTotalSales);
router.route("/total-orders").get(authenticate, authorizeAdmin, countTotalOrders);
router.route("/top-selling-products").get(authenticate, authorizeAdmin, fetchTopSellingProducts);
router.route("/sales-per-category").get(authenticate, authorizeAdmin, fetchSalesPerCategory);

export default router;