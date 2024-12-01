import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const HomePage = () => {
    return (
        <div className="container">
            <h1>Welcome to Student Ecommerce</h1>
            <p>Choose an option to get started:</p>
            <div>
                <Link to="/login" className="link">Login</Link>
                <Link to="/signup" className="link">Signup</Link>
            </div>
        </div>
    );
};

export default HomePage;
