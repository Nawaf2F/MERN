import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import UsersPage from './components/UsersPage';
import Update from './components/Update';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import DoctorLogin from './components/DoctorLogin';
import Uplaod from './components/Upload';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/update/:userId" element={<Update />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/doctor" element={<DoctorLogin />} />
          <Route path="/upload" element={<Uplaod />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
