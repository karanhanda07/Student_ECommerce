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
import Admin from './Components/Admin';

const App = () => {
  const [ads, setAds] = useState([]);

  const ConditionalNavBar = () => {
    const location = useLocation();

    if (['/login', '/signup', '/'].includes(location.pathname)) {
      return null;
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

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;