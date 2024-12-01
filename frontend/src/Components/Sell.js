import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = ({ ads, setAds }) => {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handlePhotoChange = (event) => {
        setPhoto(URL.createObjectURL(event.target.files[0])); // Create a preview of the image
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!photo || !name || !price || !description) {
            setMessage('Please fill out all fields.');
            return;
        }

        const newAd = {
            id: ads.length + 1,
            photo,
            name,
            price,
            description,
        };

        setAds([...ads, newAd]); // Add new ad to the list

        // Reset form
        setPhoto(null);
        setName('');
        setPrice('');
        setDescription('');
        setMessage('Item listed for sale successfully!');
    };

    return (
        <div className="container">
            <h1>Sell an Item</h1>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Enter item name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: '10px', width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        placeholder="Enter item price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ padding: '10px', width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <textarea
                        placeholder="Enter item description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ padding: '10px', width: '300px', height: '100px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Submit
                </button>
                {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            </form>

            {/* Add Go Back Button */}
            <div style={{ marginTop: '30px' }}>
                <button
                    onClick={() => navigate('/welcome')} // Navigate back to the Welcome page
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
                    Go Back to Welcome Page
                </button>
            </div>
        </div>
    );
};

export default Sell;
