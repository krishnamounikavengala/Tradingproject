import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AlphaVantageAPIKey = '6N8KY4LU31TE5JQ2'; // Your Alpha Vantage API Key
const SYMBOL = 'BSE'; // Alpha Vantage symbol for BSE SENSEX or a suitable proxy

export default function SensexChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensexData = async () => {
      try {
        setLoading(true);
        // Using "TIME_SERIES_DAILY" for historical data to simulate a chart
        // For real-time, "GLOBAL_QUOTE" gives just the latest, but for charts, you need series.
        // Alpha Vantage's free tier has rate limits (5 calls/minute, 500 calls/day).
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${AlphaVantageAPIKey}`
        );
        const data = await response.json();

        if (data['Error Message']) {
          throw new Error(data['Error Message']);
        }
        if (!data['Time Series (Daily)']) {
          throw new Error('No daily time series data found for SENSEX proxy. Check symbol or API key.');
        }

        const timeSeries = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).sort((a, b) => new Date(a) - new Date(b)); // Sort by date ascending
        const closingPrices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

        setChartData({
          labels: dates.slice(-30), // Get last 30 days for display
          datasets: [
            {
              label: `${SYMBOL} Index Close Price`,
              data: closingPrices.slice(-30),
              fill: true,
              backgroundColor: 'rgba(34, 197, 94, 0.2)', // Emerald green with transparency
              borderColor: 'rgba(34, 197, 94, 1)',      // Emerald green
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 0, // Hide points for a smoother line
              hoverRadius: 5,
            },
          ],
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching SENSEX data:", err);
        setError("Failed to load SENSEX data. Please try again later or check API key/symbol.");
        setChartData({ labels: [], datasets: [] }); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchSensexData();
    // Fetch every 5 minutes (300000 ms) for more up-to-date data, keeping API limits in mind
    // For a free tier, you might want to fetch less frequently or only once on load.
    const interval = setInterval(fetchSensexData, 300000); 
    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#cbd5e1', // Light gray for legend text
        }
      },
      title: {
        display: true,
        text: `${SYMBOL} Index Performance (Last 30 Days)`,
        color: '#e2e8f0', // White for title
        font: {
            size: 18
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30,41,59,0.9)', // Dark background for tooltip
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: '#34d399', // Emerald border
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8', // Gray for x-axis labels
          maxRotation: 45,
          minRotation: 45,
          callback: function(val, index) {
            // Display every 5th label to avoid clutter
            return index % 5 === 0 ? this.getLabelForValue(val) : '';
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)', // Faint grid lines
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#94a3b8', // Gray for y-axis labels
          callback: function(value) {
            return '₹' + value.toFixed(0); // Format as currency
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)', // Faint grid lines
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl h-[400px]">
      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          Loading SENSEX Data...
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full text-red-400">
          <p>{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Tip: Check the Alpha Vantage symbol (currently "{SYMBOL}") and your API key. Free tier has rate limits (5 calls/min, 500 calls/day).
          </p>
        </div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}