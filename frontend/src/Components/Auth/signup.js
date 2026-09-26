import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

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
            const response = await axios.post(
                'http://localhost:5000/api/auth/signup',
                { email, password }
            );

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
        <div className="auth-page">
            <div className="auth-card">

                <Link to="/" className="auth-logo">
                    StudentEcom
                </Link>

                <h1>Create account</h1>

                <p className="auth-subtitle">
                    Sign up to start using StudentEcom.
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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        className="auth-button"
                        onClick={onSignupClick}
                    >
                        Sign Up
                    </button>

                    {message && (
                        <p className="auth-error">
                            {message}
                        </p>
                    )}

                </div>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link to="/login">Log in</Link>
                </p>

            </div>
        </div>
    );
};

export default Signup;