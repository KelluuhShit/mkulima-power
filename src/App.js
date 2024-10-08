// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen'; // Import HomeScreen

const App = () => {
  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} /> {/* Welcome Screen */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<HomeScreen />} /> {/* Home Screen route */}
        </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
