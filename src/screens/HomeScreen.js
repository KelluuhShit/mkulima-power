import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';
import StoriesScreen from './StoriesScreen';
const HomeScreen = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/signin', { replace: true });
        }
    }, [user, navigate]);

    // Define styles for the scrollbar
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: 'rgb(166,212,159)',
        },
        scrollableDiv: {
            overflowY: 'scroll', // Enable scrolling
            height: '100%', // Take full height
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
        },
        // Webkit for Chrome, Safari, and Opera
        webkitScrollbar: {
            display: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <div className="flex flex-row justify-around w-full h-screen">
                        {/* ProfileScreen takes up 20% width, hidden on small screens */}
                        <div className={`w-1/5 hidden md:block`}>
                            <ProfileScreen />
                        </div>

                        {/* FeedScreen takes up full width on small screens and 60% width on medium and larger screens */}
                        <div style={styles.scrollableDiv} className="no-scrollbar w-full md:w-3/5">
                            <FeedScreen />
                        </div>

                        {/* StoriesScreen takes up 20% width, hidden on small screens */}
                        <div className={`w-1/5 hidden md:block`}>
                            <StoriesScreen />
                        </div>
            </div>
        </div>
    );
};

export default HomeScreen;
