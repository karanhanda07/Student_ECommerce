import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ loggedIn, email, setLoggedIn }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (loggedIn) {
            localStorage.removeItem('user');
            setLoggedIn(false);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <div className="buttonContainer">
                <input
                    className="inputButton"
                    type="button"
                    onClick={handleButtonClick}
                    value={loggedIn ? 'Log out' : 'Log in'}
                />
                {loggedIn && <div>Your email address is {email}</div>}
            </div>
        </div>
    );
};

export default Home;
