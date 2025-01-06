import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// Route to create an order and get all orders (Admin Only)
router
  .route("/")
  .post(authenticate, createOrder) // Authenticated customers can create orders
  .get(authenticate, authorizeAdmin, getAllOrders); // Admin can view all orders

// Route to get orders of the logged-in user
router.route("/mine").get(authenticate, getUserOrders);

// Route to get total orders and sales data
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);

// Route to get order details by ID
router.route("/:id").get(authenticate, findOrderById);

// Route to mark an order as paid
router.route("/:id/pay").put(authenticate, markOrderAsPaid);

// Route to mark an order as delivered (Admin Only)
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);

export default router;