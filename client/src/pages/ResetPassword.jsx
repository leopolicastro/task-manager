import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const ResetPassword = () => {
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/users/password/forgot?email=${formData.email}&password=${formData.password}`
      );
      if (response) {
        swal(
          'Email sent',
          'Check your email for a link to reset your password.'
        );
      }
    } catch (error) {
      swal('Error', 'Oops, something went wrong.');
    }
  };
  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1 className="mb-4">Reset Password</h1>
      <Form style={{ width: 300 }} onSubmit={handleSubmit}>
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
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form.Group>
      </Form>
      <Link to="/login">Go back</Link>
    </Container>
  );
};

export default ResetPassword;
