import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  console.log("userId",userId)

  const handleSubmit = async (event) => { 
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://43.254.41.144:9090/api/Users/verify-otp', {
        userId,
        otp
      });
      const token = response.data.jwtToken;
      if (token){
        localStorage.setItem('token', token);
        console.log("JWT Token Stored:", localStorage.getItem('token'));
        navigate('/folderTree')
      }
    } catch (error) {
      toast.error('Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Verify OTP</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formOtp" className="mb-3">
          <Form.Label>OTP</Form.Label>
          <Form.Control 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Verify OTP'}
        </Button>
      </Form>
    </Container>
  );
}

export default OtpPage;