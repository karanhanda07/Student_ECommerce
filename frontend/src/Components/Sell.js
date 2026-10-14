import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        // Limit images to 500 KB
        if (file.size > 500 * 1024) {
            setMessage('Please select an image smaller than 500 KB.');
            setPhoto(null);
            return;
        }

        // Convert the image into a string we can save
        const reader = new FileReader();

        reader.onloadend = () => {
            setPhoto(reader.result);
            setMessage('');
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check that all fields are filled
        if (!photo || !name || !price || !description) {
            setMessage('Please fill out all fields.');
            return;
        }

        // Make sure the price is a valid positive number
        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            setMessage('Please enter a valid price.');
            return;
        }

        try {
            // Send the product information to our Express backend
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price: numericPrice,
                    description,
                    image: photo // Send the image to MongoDB
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save product.');
            }

            // The product is now saved in MongoDB
            setPhoto(null);
            setName('');
            setPrice('');
            setDescription('');
            setMessage('Item listed for sale successfully!');

        } catch (error) {
            console.error('Error saving product:', error);
            setMessage('Failed to list item. Please try again.');
        }
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
