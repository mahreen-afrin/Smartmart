// src/utils/salesReportUtils.js
import { useGetTotalSalesQuery, useGetTopSellingProductsQuery } from "../api/reportApiSlice";

// Get Total Sales - Hook to be used inside your component
export const getTotalSales = () => {
  return useGetTotalSalesQuery();
};

// Get Top Selling Products - Hook to be used inside your component
export const getTopSellingProducts = () => {
  return useGetTopSellingProductsQuery();
};
