# StudentEcom

StudentEcom is a full-stack student marketplace where students can buy and sell items within their community.

The project is currently under active development and is being expanded with persistent product listings, role-based access, and improved marketplace functionality.

## Tech Stack

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT authentication
* bcrypt password hashing

## Current Features

* User signup
* User login
* Password hashing with bcrypt
* JWT-based authentication
* Student marketplace landing page
* Buy and Sell pages
* Product listing interface
* Responsive homepage design

## In Development

* Persistent product listings with MongoDB
* User and admin roles
* Admin dashboard
* Improved Buy Now flow
* Product management
* Improved marketplace UI

## Project Structure

```text
Student_ECommerce/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   └── assets/
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── Models/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## Prerequisites

Before running the project, install:

* Node.js
* npm
* MongoDB

MongoDB must be running locally.

## Installation

Clone the repository:

```bash
git clone https://github.com/karanhanda07/Student_ECommerce.git
cd Student_ECommerce
```

Install the frontend dependencies:

```bash
cd frontend
npm install
```

Install the backend dependencies:

```bash
cd ../backend
npm install
```

## Running the Application

The frontend and backend currently run separately.

### Start the Backend

From the `backend` directory:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal and go to the `frontend` directory:

```bash
npm start
```

The React application runs on:

```text
http://localhost:3000
```

## Database

The backend currently connects to a local MongoDB database:

```text
mongodb://127.0.0.1:27017/testDB
```

User accounts are stored in the `users` collection.

## Authentication

Passwords are hashed using bcrypt before being stored in MongoDB.

After a successful login, the backend creates a JWT that is used for authentication.

## Project Status

StudentEcom is an ongoing portfolio project. The current focus is improving the original student project into a more complete full-stack marketplace with persistent data, better authentication and authorization, improved buying and selling workflows, and a modern user interface.
