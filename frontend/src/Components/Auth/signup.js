import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onSignupClick = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
            if (response.data.message === 'User registered successfully.') {
                alert('Signup successful!');
                navigate('/login');
            } else {
                setMessage(response.data.message || 'Signup failed.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Signup</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '10px', padding: '10px', width: '300px' }}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px', padding: '10px', width: '300px' }}
            />
            <br />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ marginBottom: '10px', padding: '10px', width: '300px' }}
            />
            <br />
            <button onClick={onSignupClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>Signup</button>
            {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
        </div>
    );
};

export default Signup;
