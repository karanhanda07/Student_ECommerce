import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ItemDetails = () => {
    // Get the product ID from the URL
    const { id } = useParams();

    const navigate = useNavigate();

    // Store the selected product
    const [item, setItem] = useState(null);

    // Track loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Request the selected product from MongoDB through our backend
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Product not found.');
                }

                return response.json();
            })
            .then((data) => {
                // Save the product in React state
                setItem(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!item) {
        return <p>Item not found.</p>;
    }

    return (
        <div className="container">
            <h1>Item Details</h1>

            <div style={{ textAlign: 'center' }}>
                {item.image && (
                    <img
                        src={item.image}
                        alt={item.name}
                        style={{
                            width: '300px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                        }}
                    />
                )}

                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p><strong>${item.price}</strong></p>
                {/* Confirm the selected product */}
                <button
                    onClick={() => alert('Purchase confirmation feature coming next!')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginTop: '20px',
                        marginRight: '10px'
                    }}
                >
                    Confirm Purchase
                </button>
                <button
                    onClick={() => navigate('/buy')}
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
                    Go Back to Listings
                </button>
            </div>
        </div>
    );
};

export default ItemDetails;