import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const validateInputs = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

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

        return isValid;
    };

    const onButtonClick = async () => {
        if (!validateInputs()) return;

        const accountExists = await checkAccountExists();
        if (accountExists) {
            await logIn();
        } else if (window.confirm(`An account does not exist with this email address: ${email}. Do you want to create a new account?`)) {
            await logIn();
        }
    };

    const checkAccountExists = async () => {
        const response = await fetch('http://localhost:3080/check-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const result = await response.json();
        return result?.userExists;
    };

    const logIn = async () => {
        const response = await fetch('http://localhost:3080/auth', {
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
            window.alert('Wrong email or password');
        }
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="inputBox"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input className="inputButton" type="button" onClick={onButtonClick} value="Log in" />
            </div>
        </div>
    );
};

export default Login;
