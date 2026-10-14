import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Buy = () => {
    const navigate = useNavigate();

    // Store products received from MongoDB
    const [products, setProducts] = useState([]);

    // Fetch products when the Buy page opens
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                return response.json();
            })
            .then((data) => {
                // Save the products in React state
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Keep existing temporary ads visible for now
    const allItems = products;

    return (
        <div className="container">
            <h1>Available Items</h1>

            <div>
                {allItems.map((item, index) => (
                    <div key={item._id || index} className="card">
                        {/* Display the product image if available */}
                        {(item.image || item.photo) && (
                            <img
                                src={item.image || item.photo}
                                alt={item.name || 'Item'}
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '5px'
                                }}
                            />
                        )}

                        <h3>{item.name || 'Custom Item'}</h3>
                        <p>{item.description}</p>
                        <p>
                            <strong>{item.price || 'Custom Price'}</strong>
                        </p>

                        <button
                            onClick={() => navigate(`/item/${item._id}`)}
                        >
                            Buy Now
                        </button>
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
                        marginTop: '20px'
                    }}
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default Buy;