import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://43.254.41.144:9090/api/Users/authenticate', {
        username,
        password
      });
      if (response.data && response.data.id) {
        toast.success('Login successful. Please verify OTP.');
        navigate('/otp', { state: { userId: response.data.id } });
  
      }
      else{
        toast.error("Invalid username or password")
      }
    } catch (error) {
      console.log("Error",error)
      toast.error('something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;