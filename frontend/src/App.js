import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css';

// Components
import Header from './components/Header';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import ExpenseSummary from './components/ExpenseSummary';

const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentExpense, setCurrentExpense] = useState(null);

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setExpenses(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch expenses');
      setLoading(false);
      console.error(error);
    }
  };

  // Add expense
  const addExpense = async (expense) => {
    try {
      const res = await axios.post(API_URL, expense);
      setExpenses([res.data, ...expenses]);
      toast.success('Expense added successfully');
    } catch (error) {
      toast.error('Failed to add expense');
      console.error(error);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error('Failed to delete expense');
      console.error(error);
    }
  };

  // Update expense
  const updateExpense = async (id, updatedExpense) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedExpense);
      setExpenses(expenses.map(expense => 
        expense._id === id ? res.data : expense
      ));
      toast.success('Expense updated successfully');
      setCurrentExpense(null);
    } catch (error) {
      toast.error('Failed to update expense');
      console.error(error);
    }
  };

  // Set current expense for editing
  const setExpenseForEdit = (expense) => {
    setCurrentExpense(expense);
  };

  // Clear current expense
  const clearCurrentExpense = () => {
    setCurrentExpense(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <div className="container">
        <div className="main-content">
          <div className="left-panel">
            <AddExpenseForm 
              addExpense={addExpense} 
              currentExpense={currentExpense}
              updateExpense={updateExpense}
              clearCurrentExpense={clearCurrentExpense}
            />
            <ExpenseSummary expenses={expenses} />
          </div>
          <div className="right-panel">
            <ExpenseChart expenses={expenses} />
            <ExpenseList 
              expenses={expenses} 
              loading={loading} 
              deleteExpense={deleteExpense}
              setExpenseForEdit={setExpenseForEdit}
            />
          </div>
        </div>
        <p>Prepared By Niral Rohit 23IT110</p>
      </div>
    </div>
  );
}

export default App;
