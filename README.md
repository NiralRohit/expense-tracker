# Expense Tracker

A simple expense tracking application built with React, Node.js, Express, and MongoDB.

## Features

- Add, edit, and delete expenses
- Categorize expenses by type
- View expense distribution in a pie chart
- Summary statistics of your spending
- Responsive design

## Tech Stack

- **Frontend**: React, Chart.js, Axios, React-Toastify
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd expense-tracker
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Install frontend dependencies:
```
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

### Running the Application

1. Start the MongoDB service:
```
mongod
```

2. Start the backend server (from the backend directory):
```
npm run server
```

3. Start the frontend development server (from the frontend directory):
```
npm start
```

4. Or use concurrently to run both frontend and backend (from the backend directory):
```
npm run dev
```

5. Visit `http://localhost:3000` in your browser to use the application.

## API Endpoints

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create a new expense
- `GET /api/expenses/:id` - Get expense by ID
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense
- `GET /api/expenses/summary/byType` - Get expense summary by type 