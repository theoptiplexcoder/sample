import React from "react";
import { Line } from "react-chartjs-2";
import "./StockChart.css";

const StockChart = ({ dates, prices }) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Closing Prices",
        data: prices,
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockChart;
