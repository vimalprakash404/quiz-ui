// RegisterPage.js

import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import domain from "../domian"
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone,setPhone]=useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const register_data = async (username , email , password) => {
    try {
      const response = await fetch(domain()+ '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password  , phone}),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      console.log('Registration successful!');
      navigate("/menu");

      // You can redirect the user to the login page or perform other actions after successful registration
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Simple validation for demonstration purposes
    if (!name || !email || !password || password !== confirmPassword || !phone) {
      setError('Please fill in all fields and make sure passwords match.');
      return;
    }

    // Add your registration logic here
    console.log('Registration successful with:', { name, email, password });
    register_data(name , email,password,phone);
  };

  
  return (
    <Container className="mt-4 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '300px' }}>
        <Card.Body>
          <Card.Title className="text-center">Register</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit" block>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
