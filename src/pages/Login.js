import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Login() {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    e.preventDefault();
    console.log("Sending login request with:", { email: email.trim(), password: password.trim() });
    fetch('https://fitnessapp-api-ln8u.onrender.com/users/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password: password.trim() })
    })
    .then(res => {
      console.log("Login response status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("Login response data:", data);
      if (data.access) {
        localStorage.setItem('token', data.access);
        retrieveUserDetails(data.access);
        notyf.success('Successful Login');
      } else {
        notyf.error('Login Failed');
      }
    })
    .catch(error => {
      console.error("Error during login request:", error);
      notyf.error('Login Failed');
    });
    setEmail('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    console.log("Retrieving user details with token:", token);
    fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("User details response status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("User details response data:", data);
      setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
    })
    .catch(error => {
      console.error("Error during user details request:", error);
    });
  };

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    (user.id !== null) ? <Navigate to="/" /> :
      <Form onSubmit={(e) => authenticate(e)}>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {isActive ? 
          <Button variant="primary" type="submit">Submit</Button> 
          : 
          <Button variant="danger" type="submit" disabled>Submit</Button>
        }
      </Form>
  );
}
