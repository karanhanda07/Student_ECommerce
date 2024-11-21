import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './Components/Auth/login';
import './App.css';
import { useEffect, useState } from 'react';
import Signup from './Components/Auth/signup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/signup"
            element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail} setPassword={setPassword}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;