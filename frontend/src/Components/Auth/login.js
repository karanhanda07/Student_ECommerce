import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onLoginClick = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            if (response.data.message === 'Login successful') {
                localStorage.setItem('token', response.data.token); // Store token
                navigate('/welcome'); // Redirect to Welcome page
            } else {
                setMessage(response.data.message || 'Login failed.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login</h2>
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
            <button onClick={onLoginClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
            {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
        </div>
    );
};

export default Login;
