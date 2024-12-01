import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Student Ecommerce</h1>
            <h2>What would you like to do?</h2>
            <div style={{ marginTop: '30px' }}>
                <Link
                    to="/buy"
                    style={{
                        padding: '10px 20px',
                        margin: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Buy
                </Link>
                <Link
                    to="/sell"
                    style={{
                        padding: '10px 20px',
                        margin: '10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px',
                    }}
                >
                    Sell
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
