import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import axios from '../../axios/index';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();  // Hook to handle redirection

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/');  // Redirect to home if token exists
    }
  }, [navigate]);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async () => {
    if (!email) {
      message.warning('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      message.warning('Invalid email format');
      return;
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);

    try {
      const response = await axios.post('/auth/sendotp', {
        email,
        otp,
      });

      if (response.status === 200) {
        message.success(`OTP sent to ${email}`);
        setOtpSent(true); 
      } else {
        message.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      message.error('Error while sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!userOtp) {
      message.warning('Please enter the OTP');
      return;
    }

    if (userOtp === generatedOtp) {
      try {
        const response = await axios.post('/auth/login', { email });

        if (response.status === 200) {
          const { token, message: serverMessage } = response.data;
          localStorage.setItem('authToken', token);
          message.success(`${serverMessage}. Logged in successfully!`);
          console.log('JWT token saved:', token);
        window.location.href = "/"
        } else {
          message.error('Authentication failed');
        }
      } catch (error) {
        console.error('Error authenticating:', error);
        message.error('Login failed. Please try again.');
      }
    } else {
      message.error('Invalid OTP');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Login with OTP</h2>

      <Input
        placeholder="Enter your email"
        style={{ marginBottom: 20 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={otpSent} // Disable email input after sending OTP
      />

      {!otpSent && (
        <Button type="dashed" onClick={handleSendOtp} block>
          Send OTP
        </Button>
      )}

      {otpSent && (
        <>
          <Input
            placeholder="Enter OTP"
            maxLength={4}
            style={{ margin: '16px 0' }}
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
          />

          <Button type="primary" onClick={handleVerifyOtp} block>
            Verify OTP
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
