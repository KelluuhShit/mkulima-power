// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import WelcomeScreen from './screens/WelcomeScreen';

const App = () => {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/signup" className="text-white">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin" className="text-white">Sign In</Link>
          </li>
        </ul>
      </nav>

      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<WelcomeScreen />} /> {/* Welcome Screen */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
