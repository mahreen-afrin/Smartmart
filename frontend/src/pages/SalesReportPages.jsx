// src/pages/SalesReportPage.jsx
import React, { useEffect, useState } from "react";
import { useGetTotalSalesQuery, useGetTopSellingProductsQuery } from "../slices/reportApiSlice";

const SalesReportPage = () => {
  // Fetching data using Redux Toolkit API slices
  const { data: totalSalesData, isLoading: isLoadingSales } = useGetTotalSalesQuery();
  const { data: topSellingProductsData, isLoading: isLoadingTopProducts } = useGetTopSellingProductsQuery();

  // Local state for handling errors or formatting if necessary
  const [totalSales, setTotalSales] = useState(0);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    // Set the data from Redux slice hooks to local state
    if (totalSalesData) {
      setTotalSales(totalSalesData.totalSales);
    }
    if (topSellingProductsData) {
      setTopSellingProducts(topSellingProductsData);
    }
  }, [totalSalesData, topSellingProductsData]);

  if (isLoadingSales || isLoadingTopProducts) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>Sales Report</h3>
      <p>Total Sales: ${totalSales}</p>
      <h4>Top Selling Products</h4>
      <ul>
        {topSellingProducts.map((product) => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} width={50} />
            <span>{product.name} - {product.totalSold} sold</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReportPage;
