import './App.css';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Workouts from './pages/Workouts';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      });
    } else {
      setUser({
        id: null,
        isAdmin: null
      });
    }
  }, []);

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={user.id ? <Navigate to="/workouts" /> : <Register />} />
            <Route path="/login" element={user.id ? <Navigate to="/workouts" /> : <Login />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
