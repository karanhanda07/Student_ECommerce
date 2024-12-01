import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear the user session
    navigate('/login'); // Redirect to login
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/welcome" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#007bff' }}>
        Home
      </Link>
      {/* Show Sign Out button only on certain pages */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/' && (
        <button
          onClick={handleSignOut}
          style={{
            padding: '5px 10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default NavBar;
