import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Auth/login';
import Signup from './Components/Auth/signup';
import Welcome from './Components/Welcome';
import Buy from './Components/Buy';
import Sell from './Components/Sell';
import ItemDetails from './Components/ItemDetails';
import NavBar from './Components/Navbar/navbar';

const App = () => {
  const [ads, setAds] = useState([]); // Shared state for ads

  const ConditionalNavBar = () => {
    const location = useLocation();
    if (['/login', '/signup', '/'].includes(location.pathname)) {
      return null; // Hide NavBar on Login, Signup, and HomePage
    }
    return <NavBar />;
  };

  return (
    <Router>
      <ConditionalNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/buy" element={<Buy ads={ads} />} />
        <Route path="/sell" element={<Sell ads={ads} setAds={setAds} />} />
        <Route path="/item/:id" element={<ItemDetails ads={ads} />} />
      </Routes>
    </Router>
  );
};

export default App;
