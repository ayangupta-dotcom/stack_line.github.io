import React, { FC, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Product } from './types'; // Ensure this points to your types definition

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

interface ProductLineGraphProps {
  products: Product[];
}

const ProductLineGraph: FC<ProductLineGraphProps> = ({ products }) => {
  const [chartData, setChartData] = useState<ChartData<'line', number[], string>>({
    labels: [],
    datasets: [],
  });

  // Moved outside of useEffect to be accessible for options object
  const product = products.length > 0 ? products[0] : null;
  const retailSalesData = product?.sales.map(s => s.retailSales) || [];
  const wholesaleSalesData = product?.sales.map(s => s.wholesaleSales) || [];
  const salesData = [...retailSalesData, ...wholesaleSalesData];
  const maxSales = Math.max(...salesData);
  const minSales = Math.min(...salesData);

  useEffect(() => {
    if (product) {
      const labels = product.sales.map(sale => sale.weekEnding);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Retail Sales',
            data: retailSalesData,
            borderColor: 'rgba(0, 123, 255, 1)',
			backgroundColor: 'rgba(0, 123, 255, 0.5)',
			tension: 0.5,
            fill: false,
          },
          {
            label: 'Wholesale Sales',
            data: wholesaleSalesData,
            borderColor: 'rgba(108, 117, 125, 1)',
			backgroundColor: 'rgba(108, 117, 125, 0.5)',
            tension: 0.5,
            fill: false,
          },
        ],
      });
    }
  }, [product]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    elements: {
        point: {
            radius: 3,
        },
    },
    animation: {
        duration: 1000,
        easing: 'easeOutQuart',
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM',
          },
          tooltipFormat: 'MMM d, yyyy',
        },
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      y: {
        // Use Math.max and Math.min to safely handle empty arrays
        max: salesData.length > 0 ? maxSales + (maxSales - minSales) / 2 : 1,
        min: salesData.length > 0 ? minSales - (maxSales - minSales) / 2 : 0,
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
      },
    },
    interaction: {
        intersect: false,
        mode: 'index',
    },
    // maintainAspectRatio: false,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProductLineGraph;
