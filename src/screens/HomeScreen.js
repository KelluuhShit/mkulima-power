// src/screens/HomeScreen.js

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase'; // Import Firebase Auth
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const HomeScreen = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user from context

    // Redirect to sign-in page if user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/signin', { replace: true });
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/signin', { replace: true }); // Redirect to SignIn page after logout
    };

    return (
        <div className="min-h-screen bg-[rgb(166,212,159)] flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4 text-[rgb(82,42,39)]">Welcome to Mkulima Power</h1>
            <p className="text-lg mb-8 text-[rgb(82,42,39)]">
                Empowering Farmers for a Sustainable Future
            </p>

            <div className="flex space-x-4 mb-8">
                <Link to="/explore">
                    <button className="bg-[rgb(197,152,73)] text-white py-2 px-8 rounded-lg hover:bg-[rgb(199,62,29)]">
                        Explore Features
                    </button>
                </Link>
                <Link to="/profile">
                    <button className="bg-[rgb(156,179,128)] text-white py-2 px-8 rounded-lg hover:bg-[rgb(82,42,39)]">
                        View Profile
                    </button>
                </Link>
            </div>

            <button onClick={handleLogout} className="text-[rgb(199,62,29)] hover:underline">
                Logout
            </button>
        </div>
    );
};

export default HomeScreen;
