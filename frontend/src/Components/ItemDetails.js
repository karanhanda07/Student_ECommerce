import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ItemDetails = ({ ads }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the selected item by ID
    const item = ads.find((ad) => ad.id === parseInt(id, 10));

    if (!item) {
        return <p>Item not found.</p>;
    }

    return (
        <div className="container">
            <h1>Item Details</h1>
            <div style={{ textAlign: 'center' }}>
                {item.photo && (
                    <img
                        src={item.photo}
                        alt="Item"
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
                <p><strong>{item.price}</strong></p>
                <button
                    onClick={() => navigate('/buy')} // Navigate back to the Buy page
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
