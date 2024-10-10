// src/screens/HomeScreen.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';
import StoriesScreen from './StoriesScreen';


const HomeScreen = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user from context

    // Redirect to sign-in page if user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/signin', { replace: true });
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-[rgb(166,212,159)]">
            
            <div className="flex flex-row justify-around w-full">
                {/* ProfileScreen takes up 20% width */}
                <div className="w-1/5">
                    <ProfileScreen />
                </div>

                {/* FeedScreen takes up 60% width */}
                <div className="w-3/5">
                    <FeedScreen />
                </div>

                {/* StoriesScreen takes up 20% width */}
                <div className="w-1/5">
                    <StoriesScreen />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
