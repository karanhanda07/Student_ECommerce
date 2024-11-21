import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateInputs = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required.';
        if (!password) newErrors.password = 'Password is required.';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required.';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        return newErrors;
    };

    const onSignupClick = async () => {
        // Clear previous errors and messages
        setErrors({});
        setSuccessMessage('');

        // Validate inputs
        const newErrors = validateInputs();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
                confirmPassword,
            });
            setSuccessMessage(response.data.message);
            navigate('/login');
        } catch (error) {
            setErrors({ server: error.response?.data?.error || 'Something went wrong.' });
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="inputBox"
                />
                {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="inputBox"
                />
                {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    className="inputBox"
                />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>
            {errors.server && <div className="error">{errors.server}</div>}
            <button onClick={onSignupClick} className="signup-button">Sign Up</button>
        </div>
    );
};

export default Signup;
