import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const onLoginClick = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password }
            );

            if (response.data.message === 'Login successful') {
                localStorage.setItem('token', response.data.token);
                navigate('/welcome');
            } else {
                setMessage(response.data.message || 'Login failed.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <Link to="/" className="auth-logo">
                    StudentEcom
                </Link>

                <h1>Welcome back</h1>

                <p className="auth-subtitle">
                    Log in to continue to StudentEcom.
                </p>

                <div className="auth-form">
                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="auth-button"
                        onClick={onLoginClick}
                    >
                        Log In
                    </button>

                    {message && (
                        <p className="auth-error">
                            {message}
                        </p>
                    )}
                </div>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/signup">Sign up</Link>
                </p>

            </div>
        </div>
    );
};

export default Login;