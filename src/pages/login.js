// LoginPage.js

import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import domain from '../domian';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  
    
  
  
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate =  useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation for demonstration purposes
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    console.log(email);
    console.log(password);
    login_data(email,password)
    // Add your login logic here
    // For demo, let's simulate a login error
   
  };

  const login_data = async (email,password) => {
    try {
      const demo_ob =domain();
      const response = await fetch(demo_ob.concat('/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        
        setError('Invalid email or password. Please try again.');
        throw new Error('Invalid email or password');
      }

      // Assuming the server responds with a JSON object containing a token
      const data = await response.json();
      console.log('Login successful!', data.token);
      localStorage.setItem('token', data.token);
     
      navigate("/menu");
      // You can save the token in the state, local storage, or a cookie for further use
    } catch (error) {
      console.error('Login error:', error.message);
    } }



  return (
    <Container className="mt-4 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '300px' }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
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

            <Button variant="primary" type="submit" block>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
