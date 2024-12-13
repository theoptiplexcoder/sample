import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import StockForm from "./components/StockForm";
import StockChart from "./components/StockChart";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState("");

  const fetchStockData = async (symbol) => {
    const API_KEY = "9S9V88P9MQMFFRNK"; 
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data["Time Series (Daily)"];

      if (!data) {
        setError("No data available for the given stock symbol.");
        setDates([]);
        setPrices([]);
        return;
      }

      const processedData = Object.entries(data).map(([date, values]) => ({
        date,
        price: parseFloat(values["4. close"]),
      }));

      // Reverse the data to show in chronological order
      const sortedData = processedData.reverse();

      setDates(sortedData.map((item) => item.date));
      setPrices(sortedData.map((item) => item.price));
      setError("");
    } catch (error) {
      setError("Error fetching stock data. Please try again.");
      setDates([]);
      setPrices([]);
      console.error(error);
    }
  };

  return (
    <div className="app">
      <Header />
      <StockForm fetchStockData={fetchStockData} />
      {error && <div className="error-message">{error}</div>}
      {dates.length > 0 && prices.length > 0 && (
        <StockChart dates={dates} prices={prices} />
      )}
      <Footer />
    </div>
  );
};

export default App;