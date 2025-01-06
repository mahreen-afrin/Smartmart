// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utilities
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { sendOrderConfirmation, notifyAdminNewOrder, notifyOrderDelivered, notifyPriceChange } from "./utils/notificationService.js";  // Notification Service
import { calculateTotalSales } from "./controllers/reportController.js";  // Sales Report Controller

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);

// Add sales report route
app.get("/api/sales-report", async (req, res) => {
  try {
    const totalSales = await calculateTotalSales();
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PayPal configuration route
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Static file serving
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Test route for sending notifications
app.post("/api/test-notification", async (req, res) => {
  try {
    const { userEmail, orderDetails } = req.body;
    // Send order confirmation to the user
    await sendOrderConfirmation(userEmail, orderDetails);

    // Notify admin of the new order
    await notifyAdminNewOrder(process.env.ADMIN_EMAIL, orderDetails);

    res.json({ message: "Notifications sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
