import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase'; // Ensure this import is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user from context

    if (user) {
      navigate('/home');
      return null;
    }

    const validate = () => {
        const newErrors = {};
        if (!userName.trim()) newErrors.userName = 'Username is required';
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const handleSignUp = async (e) => {
      e.preventDefault();
      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }
  
      // Validate password strength
      if (password.length < 8 || !/[!@#$%^&*]/.test(password) || !/[A-Z]/.test(password)) {
          setErrors({ password: 'Password must be at least 8 characters long and include at least one uppercase letter and one special character.' });
          return;
      }
  
      try {
          // Create user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          // Get the user UID
          const user = userCredential.user;
  
          // Save the username in Firestore
          await setDoc(doc(db, 'users', user.uid), {
              username: userName,
              email: email,
          });
  
          navigate('/home'); // Redirect to HomeScreen
          window.location.reload();
      } catch (error) {
          // Handle specific error cases for authentication and Firestore
          let errorMessage;
          
          // Check if the error is related to authentication
          if (error.code.startsWith('auth/')) {
              errorMessage = `Error: ${error.code.split('/')[1]}`;
          } else {
              // Firestore-related errors
              errorMessage = `Firestore Error: ${error.message}`;
          }
  
          setErrors({ general: errorMessage });
      }
  };

    return (
        <div className="min-h-screen bg-[rgb(166,212,159)] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            className="absolute right-2 top-2 cursor-pointer"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <i className="fa-regular fa-eye" />
                            ) : (
                                <i className="fa-regular fa-eye-slash" />
                            )}
                        </span>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                            className="absolute right-2 top-2 cursor-pointer"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            {showConfirmPassword ? (
                                <i className="fa-regular fa-eye" />
                            ) : (
                                <i className="fa-regular fa-eye-slash" />
                            )}
                        </span>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <button className="w-full bg-[rgb(199,62,29)] text-white py-2 rounded-lg hover:bg-[rgb(82,42,39)]">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
