import React, { useState, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [playerId, setPlayerId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!playerId || !password) {
      message.warning('Both Player ID and Password are required');
      return;
    }
    setloading(true)
    try {
      const res = await axios.post('/players/login', { playerId, password });

      if (res.status === 200) {
        const { token } = res.data;

        localStorage.setItem('authToken', token);
        message.success('Login successful');
        window.location.href = '/'; // or navigate('/')
      } else {
        message.error(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || 'Login failed');
    } finally {
      setloading(false)
    }
  };

  return (
    <div style={{ width: "100%",maxWidth:"350px", margin: '20px auto', textAlign: 'center'}}>
      <h2>Player Login</h2>
      <br />

      <Input
        placeholder="Player ID (e.g., TBCLA-1234)"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <Button type="primary" block onClick={handleLogin} loading={loading}>
        Login
      </Button>
      <br />
      <br />
      <Button type="link" block onClick={_ => navigate("/register",{replace:true})}>
        I don't have account, <big>Register here</big>
      </Button>
    </div>
  );
};

export default Login;
