import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = ({ history }) => {
  const { setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      setCurrentUser(response.data);
      // persists user if browser is refreshes.
      sessionStorage.setItem('user', response.data);
      history.push('/');
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1 className="mb-4">Task Manager</h1>
      <Form style={{ width: 300 }} onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
      <Link to="/reset-password">Forgot Password?</Link>
      <Link className="mt-4" to="/signup">
        Need an Account? Sign up.
      </Link>
    </Container>
  );
};

export default Login;
