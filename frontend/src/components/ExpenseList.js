import React from 'react';

const ExpenseList = ({ expenses, loading, deleteExpense, setExpenseForEdit }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">Expenses</h2>
        <p>No expenses found. Add some expenses to get started!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">Expenses</h2>
      <ul className="expense-list">
        {expenses.map(expense => (
          <li key={expense._id} className="expense-item">
            <div className="expense-details">
              <div className="expense-title">
                <span className={`badge badge-${expense.type}`}>
                  {expense.type.charAt(0).toUpperCase() + expense.type.slice(1)}
                </span>
                {expense.title}
              </div>
              <div className="expense-info">
                <span>{formatDate(expense.date)}</span>
                {expense.description && (
                  <span title={expense.description}>
                    {expense.description.length > 30 
                      ? expense.description.substring(0, 30) + '...' 
                      : expense.description}
                  </span>
                )}
              </div>
            </div>
            <div className="expense-amount">
              {formatAmount(expense.amount)}
            </div>
            <div className="expense-actions">
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => setExpenseForEdit(expense)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => deleteExpense(expense._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList; 