import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export const BrandOrdersDoughnut = () => {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products and users
        const [productsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/users"),
        ]);

        const products = productsRes.data;
        const users = usersRes.data;

        // Collect all ordered product IDs
        let orderedProductIds = [];
        users.forEach((user) => {
          if (user.orders && Array.isArray(user.orders)) {
            user.orders.forEach((order) => {
              if (order.products && Array.isArray(order.products)) {
                order.products.forEach((product) => {
                  orderedProductIds.push(product.productId);
  });
}
        });
      }
    })

        // Count category (brand) occurrences
        const categoryCount = {};
        orderedProductIds.forEach((pid) => {
          const product = products.find((p) => p.id === pid);
          if (product && product.category) {
            categoryCount[product.category] =
              (categoryCount[product.category] || 0) + 1;
          }
        });

        // Convert to chart data
        const chartData = Object.keys(categoryCount).map((category) => ({
          name: category,
          value: categoryCount[category],
        }));

        setBrandData(chartData);
      } catch (err) {
        console.log("Error fetching brand data:", err);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#FF6384","#E499FF","#FFC4C4","#E2E685"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">
        Most Ordered Brands
      </h2>

      {brandData.length > 0 ? (
        <PieChart width={350} height={300}>
          <Pie
            data={brandData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
          >
            {brandData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500">Loading data...</p>
      )}
    </div>
  );
};
