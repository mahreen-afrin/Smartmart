import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

// Total Sales Calculation
const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json({ totalSales: orders[0]?.totalSales || 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Orders Count Calculation
const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Top-Selling Products
const fetchTopSellingProducts = async (req, res) => {
  try {
    const topSelling = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.qty" },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          name: "$productDetails.name",
          totalSold: 1,
          image: "$productDetails.image",
        },
      },
    ]);

    res.json(topSelling);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sales Per Category
const fetchSalesPerCategory = async (req, res) => {
  try {
    const salesPerCategory = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      {
        $group: {
          _id: "$categoryDetails.name",
          totalSales: { $sum: "$orderItems.price" },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
    ]);

    res.json(salesPerCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { calculateTotalSales, countTotalOrders, fetchTopSellingProducts, fetchSalesPerCategory };