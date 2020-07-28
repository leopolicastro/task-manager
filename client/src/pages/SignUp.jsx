import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';
import axios from 'axios';

const SignUp = ({ history }) => {
  const { setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', formData);
      setCurrentUser(response.data);
      // persists user if browser is refreshes.
      sessionStorage.setItem('user', response.data);
      history.push('/');
    } catch (error) {
      swal('SignUp Error: ', error.toString());
    }
  };
  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1 className="mb-4">Create Account</h1>
      <Form style={{ width: 300 }} onSubmit={handleSignUp}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

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
            Sign Up
          </Button>
        </Form.Group>
      </Form>
      <Link className="mt-4" to="/login">
        Already Have an Account? Login.
      </Link>
    </Container>
  );
};

export default SignUp;
