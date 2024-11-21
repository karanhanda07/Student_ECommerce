import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigate = useNavigate();

    const validateInputs = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (email === '') {
            setEmailError('Please enter your email');
            isValid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            isValid = false;
        }

        if (password === '') {
            setPasswordError('Please enter a password');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('The password must be 8 characters or longer');
            isValid = false;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        }

        return isValid;
    };

    const onButtonClick = () => {
        if (!validateInputs()) return;

        createAccount();
    };

    const createAccount = async () => {
        try {
            const response = await fetch('http://localhost:3080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const result = await response.json();
            if (result.message === 'success') {
                localStorage.setItem('user', JSON.stringify({ email, token: result.token }));
                props.setLoggedIn(true);
                props.setEmail(email);
                navigate('/');
            } else {
                window.alert('Error creating account');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            window.alert('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="inputBox"
                />
                {emailError && <div className="error">{emailError}</div>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="inputBox"
                />
                {passwordError && <div className="error">{passwordError}</div>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    className="inputBox"
                />
                {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
            </div>
            <button onClick={onButtonClick}>Sign Up</button>
        </div>
    );
};

export default Signup;