import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Import Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../services/firebase'; // Firestore database instance
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Loader.module.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate('/home');
    return null;
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});
    setLoading(true); // Start loading

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = userCredential.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', signedInUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // User exists, navigate to home screen
        navigate('/home', { replace: true });
        window.location.reload();
      } else {
        // User does not exist, prompt to sign up
        setErrors({ general: 'User details not found. Please sign up.' });
      }
    } catch (error) {
      setErrors({ general: `Error: ${error.message.split('Firebase: ')[1]}` });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[rgb(166,212,159)] ${loading ? styles.blur : ''}`}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[rgb(82,42,39)]">Sign In</h2>
        {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-[rgb(82,42,39)]">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-[rgb(156,179,128)] rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-[rgb(82,42,39)]">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-[rgb(156,179,128)] rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(199,62,29)] text-white py-2 rounded-lg hover:bg-[rgb(82,42,39)] transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-[rgb(82,42,39)]">
          Don’t have an account?{' '}
          <button
            className="text-[rgb(199,62,29)] hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>
      </div>
      
      {/* Loader */}
      {loading && (
        <div className={styles.loader}></div> /* Display loader when loading */
      )}
    </div>
  );
};

export default SignIn;
