// src/components/CryptoDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoTable from './CryptoTable';
import CryptoChart from './CryptoChart';

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCoinSelect = (coin) => {
    setSelectedCoin(coin);
  };

  const filteredCoins = cryptoData.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
     <center> <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={searchTerm}
        onChange={handleSearch}
      /> </center>
      <CryptoTable data={filteredCoins} onCoinSelect={handleCoinSelect} />
      {selectedCoin && <CryptoChart coinId={selectedCoin.id} />}
    </div>
  );
};

export default CryptoDashboard;
