import React, { useState } from 'react';
import "./StockForm.css"

const StockForm = ({ fetchStockData }) => {
  const [stockSymbol, setStockSymbol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData(stockSymbol);
  };

  return (
    <form className="stock-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Stock Symbol (e.g., AAPL)"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        required
      />
      <button type="submit">Predict</button>
    </form>
  );
};

export default StockForm;