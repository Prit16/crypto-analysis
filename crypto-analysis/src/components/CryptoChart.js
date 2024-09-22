// // src/components/CryptoChart.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// const CryptoChart = ({ coinId }) => {
//   const [chartData, setChartData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
//           params: {
//             vs_currency: 'usd',
//             days: '7', // last 7 days
//           },
//         });
//         const prices = response.data.prices;
//         const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
//         const data = prices.map(price => price[1]);

//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: 'Price (USD)',
//               data: data,
//               borderColor: 'rgba(75,192,192,1)',
//               fill: false,
//             },
//           ],
//         });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//       }
//     };

//     fetchChartData();
//   }, [coinId]);

//   if (loading) return <p>Loading chart...</p>;

//   return <Line data={chartData} />;
// };

// export default CryptoChart;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const CryptoChart = ({ coinId }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '7', // last 7 days
          },
        });
        const prices = response.data.prices;
        const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
        const data = prices.map(price => price[1]);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Price (USD)',
              data: data,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [coinId]);

  if (loading) return <p>Loading chart...</p>;

  return (
    <center><div style={{ width: '80%', height: '100%' }}>
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div></center>
  );
};

export default CryptoChart;
