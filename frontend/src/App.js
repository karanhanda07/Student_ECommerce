import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';
import Welcome from './pages/Welcome';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import ItemDetails from './pages/ItemDetails';
import NavBar from './components/Navbar/navbar';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const ConditionalNavBar = () => {
  const location = useLocation();

  if (['/', '/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  return <NavBar />;
};

const App = () => {
  return (
    <Router>
      <div className="app-background">
        <ConditionalNavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/item/:id" element={<ItemDetails />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
