import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Student Ecommerce</h1>
            <p>Select an option below:</p>
            <div>
                <Link to="/buy" style={{ margin: '10px', fontSize: '20px' }}>Buy</Link>
                <Link to="/sell" style={{ margin: '10px', fontSize: '20px' }}>Sell</Link>
                <Link to="/browse" style={{ margin: '10px', fontSize: '20px' }}>Browse</Link>
            </div>
        </div>
    );
};

export default Welcome;
