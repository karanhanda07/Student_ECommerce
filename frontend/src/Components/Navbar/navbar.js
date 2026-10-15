
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  // Read the logged-in user's role from the JWT
  const token = localStorage.getItem('token');
  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAdmin = payload.role === 'admin';
    } catch (error) {
      isAdmin = false;
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between border-b border-white/70 bg-white/75 px-6 py-4 shadow-sm backdrop-blur-xl md:px-10">
      <Link
        to={isAdmin ? '/admin' : '/welcome'}
        className="text-xl font-extrabold text-blue-600 no-underline"
      >
        🎓 Student<span className="text-slate-900">Ecom</span>
      </Link>

      <div className="flex items-center gap-5">
        <Link
          to={isAdmin ? '/admin' : '/welcome'}
          className="font-semibold text-slate-600 hover:text-blue-600"
        >
          Home
        </Link>

        <button
          onClick={handleSignOut}
          className="rounded-xl bg-red-50 px-5 py-2.5 font-semibold text-red-600 transition hover:bg-red-100"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
