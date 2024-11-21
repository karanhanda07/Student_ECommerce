import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import './App.css';
import { useEffect, useState } from 'react';
import Signup from './signup';

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

    verifyToken(user.token, user.email);
  }, []);

  const verifyToken = (token, email) => {
    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(data.message === 'success');
        setEmail(email || '');
      });
  };

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