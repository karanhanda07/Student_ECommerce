import React from 'react';
import { useNavigate } from 'react-router-dom';

const Buy = ({ ads }) => {
    const navigate = useNavigate();

    // Hardcoded sample items
    const hardcodedItems = [
        { id: 1, name: 'Laptop', description: 'A powerful laptop for students', price: '$1200' },
        { id: 2, name: 'Textbooks', description: 'Set of 5 essential textbooks', price: '$100' },
        { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones', price: '$200' },
    ];

    // Combine hardcoded items with uploaded ads
    const allItems = [...hardcodedItems, ...ads];

    return (
        <div className="container">
            <h1>Available Items</h1>
            <div>
                {allItems.map((item, index) => (
                    <div key={index} className="card">
                        {/* Show item photo if it exists */}
                        {item.photo && (
                            <img
                                src={item.photo}
                                alt="Item"
                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                            />
                        )}
                        <h3>{item.name || 'Custom Item'}</h3>
                        <p>{item.description}</p>
                        <p><strong>{item.price || 'Custom Price'}</strong></p>
                        <button>Buy Now</button>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/welcome')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginTop: '20px',
                    }}
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default Buy;
