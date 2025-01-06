// src/api/reportApiSlice.js
import { apiSlice } from "./apiSlice"; // Assuming apiSlice.js is where you define common logic
import { REPORT_URL } from "../constants"; // Make sure the constant for the report URL is defined

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch total sales
    getTotalSales: builder.query({
      query: () => `${REPORT_URL}/total-sales`,
      keepUnusedDataFor: 5, // Cache for 5 seconds or adjust according to your needs
    }),

    // Fetch total orders
    getTotalOrders: builder.query({
      query: () => `${REPORT_URL}/total-orders`,
      keepUnusedDataFor: 5,
    }),

    // Fetch top-selling products
    getTopSellingProducts: builder.query({
      query: () => `${REPORT_URL}/top-selling-products`,
      keepUnusedDataFor: 5,
    }),

    // Fetch sales per category
    getSalesPerCategory: builder.query({
      query: () => `${REPORT_URL}/sales-per-category`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetTotalSalesQuery,
  useGetTotalOrdersQuery,
  useGetTopSellingProductsQuery,
  useGetSalesPerCategoryQuery,
} = reportApiSlice;
