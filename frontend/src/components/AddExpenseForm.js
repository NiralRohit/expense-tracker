import React, { useState, useEffect } from 'react';

const AddExpenseForm = ({ 
  addExpense, 
  currentExpense, 
  updateExpense, 
  clearCurrentExpense 
}) => {
  const initialFormState = {
    title: '',
    amount: '',
    type: 'other',
    description: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormState);
  const { title, amount, type, description, date } = formData;

  useEffect(() => {
    if (currentExpense) {
      const expenseDate = currentExpense.date 
        ? new Date(currentExpense.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      setFormData({
        title: currentExpense.title || '',
        amount: currentExpense.amount || '',
        type: currentExpense.type || 'other',
        description: currentExpense.description || '',
        date: expenseDate
      });
    }
  }, [currentExpense]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Convert amount to a number
    const formattedExpense = {
      ...formData,
      amount: Number(formData.amount)
    };

    if (currentExpense) {
      updateExpense(currentExpense._id, formattedExpense);
    } else {
      addExpense(formattedExpense);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormState);
    clearCurrentExpense();
  };

  return (
    <div className="card">
      <h2 className="card-title">
        {currentExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Expense title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
            required
          >
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="utilities">Utilities</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Additional details"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-block">
            {currentExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {currentExpense && (
            <button 
              type="button" 
              className="btn btn-secondary btn-block" 
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm; 