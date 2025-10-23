import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from './axios';
import {
  setToken, setUser, logout
} from './redux/slices/authSlice';
import { fetchTeams } from './redux/slices/teamSlice';
import { fetchPlayers } from './redux/slices/playerSlice';

import Layout from './pages';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Team from './pages/Team';
import ManageTeam from './pages/ManageTeam';
import SingleTeam from './pages/component/SingleTeam';
import Contact from './pages/Contact';
import Login from './pages/component/Login';
import 'antd/dist/antd.css'; 
import PlayerRegistration from './pages/component/Register';
import About from './pages/About';
import Rules from './pages/Rule';

const App = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth); 

  // Verify token and fetch user
  useEffect(() => {
    const verifyAndFetchUser = async () => {
      const tokenFromStorage = localStorage.getItem('authToken');
      if (!tokenFromStorage) { 
        return;
      }
      try {
        const res = await axios.post('/auth/verifytoken', { token: tokenFromStorage });
        if (res.data.valid) {
          dispatch(setToken(tokenFromStorage));
          const userRes = await axios.post('/players/currentuser', { token: tokenFromStorage }); 
          dispatch(setUser(userRes.data?.player));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      }  
    };
    verifyAndFetchUser();
  }, [dispatch]);

  // Fetch team after user loads
  useEffect(() => {
    const loadTeam = async () => {
      if (user?._id) {
        await dispatch(fetchTeams(user._id));
      }
    };
    loadTeam();
  }, [user, dispatch]);


  // create a new visitor
  useEffect(() => {
    const createVisitor = async () => { 
        await axios.post("/monitor/create")
        .then(res => console.log(res))
    };
    createVisitor();
  }, []);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.tbcla.in/");  
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={user ? <Navigate to={"/"} /> : <PlayerRegistration />} />
          <Route path="login" element={user ? <Navigate to={"/"} /> : <Login />} />
          <Route path="about" element={<About />} />
          <Route path="rules" element={<Rules />} />
          <Route path="profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="contact" element={<Contact /> } />
          <Route path="team" element={<Team />} />
          <Route path="manageteam" element={token ? <ManageTeam /> : <Navigate to="/login" replace />} /> 
          <Route path="team/:id" element={<SingleTeam />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
