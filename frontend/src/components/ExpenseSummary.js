import React, { useMemo } from 'react';

const ExpenseSummary = ({ expenses }) => {
  const summary = useMemo(() => {
    if (!expenses.length) return null;

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Get highest expense
    const highest = Math.max(...expenses.map(expense => expense.amount));

    // Get most recent expense
    const mostRecent = new Date(
      Math.max(...expenses.map(expense => new Date(expense.date)))
    );

    // Get count by type
    const typeCount = expenses.reduce((acc, expense) => {
      const { type } = expense;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
      return acc;
    }, {});

    // Get most frequent type
    let mostFrequentType = '';
    let maxCount = 0;
    
    Object.entries(typeCount).forEach(([type, count]) => {
      if (count > maxCount) {
        mostFrequentType = type;
        maxCount = count;
      }
    });

    return { total, highest, mostRecent, mostFrequentType };
  }, [expenses]);

  // Format currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Capitalize
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!summary) {
    return (
      <div className="card">
        <h2 className="card-title">Summary</h2>
        <p>Add expenses to see the summary</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Summary</h2>
      <div className="summary-container">
        <div className="summary-item">
          <div className="summary-title">Total Expenses</div>
          <div className="summary-value">{formatAmount(summary.total)}</div>
        </div>
        <div className="summary-item">
          <div className="summary-title">Highest Expense</div>
          <div className="summary-value">{formatAmount(summary.highest)}</div>
        </div>
        <div className="summary-item">
          <div className="summary-title">Most Recent</div>
          <div className="summary-value">{formatDate(summary.mostRecent)}</div>
        </div>
        <div className="summary-item">
          <div className="summary-title">Common Category</div>
          <div className="summary-value">{capitalize(summary.mostFrequentType)}</div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary; 