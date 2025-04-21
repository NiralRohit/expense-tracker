import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  // Define colors for different expense types
  const typeColors = {
    food: '#e67e22',
    transportation: '#3498db',
    entertainment: '#9b59b6',
    shopping: '#f1c40f',
    utilities: '#1abc9c',
    health: '#2ecc71',
    education: '#34495e',
    other: '#95a5a6',
  };

  useEffect(() => {
    if (expenses.length === 0) return;

    // Group expenses by type and sum amounts
    const expenseByType = expenses.reduce((acc, expense) => {
      const { type, amount } = expense;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += amount;
      return acc;
    }, {});

    // Prepare data for the pie chart
    const labels = Object.keys(expenseByType).map(
      type => type.charAt(0).toUpperCase() + type.slice(1)
    );
    
    const data = Object.values(expenseByType);
    
    const backgroundColor = Object.keys(expenseByType).map(
      type => typeColors[type]
    );

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1,
        },
      ],
    });
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">Expense Distribution</h2>
        <p>Add expenses to see the chart</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Expense Distribution</h2>
      <div className="chart-container">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart; 