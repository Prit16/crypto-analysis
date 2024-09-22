// src/components/CryptoTable.js
import React from 'react';

const CryptoTable = ({ data, onCoinSelect }) => {
  return (
    <center><table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price (USD)</th>
          <th>Market Cap</th>
          <th>24h Change (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id} onClick={() => onCoinSelect(coin)}>
            <td>{coin.market_cap_rank}</td>
            <td>{coin.name}</td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
              {coin.price_change_percentage_24h.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table></center>
  );
};

export default CryptoTable;
