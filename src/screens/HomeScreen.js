import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';
import StoriesScreen from './StoriesScreen';
import styles from '../styles/Loader.module.css'; // Import styles

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
        <div className={`min-h-screen bg-[rgb(166,212,159)] ${styles.loaderContainer}`}> {/* Apply styles here */}
            <div className="flex flex-row justify-around w-full h-screen">
                {/* ProfileScreen takes up 20% width and scrolls independently */}
                <div className={`w-1/5 overflow-y-scroll h-full no-scrollbar ${styles.profileScreen}`}>
                    <ProfileScreen />
                </div>

                {/* FeedScreen takes up 60% width and scrolls independently */}
                <div className={`w-3/5 overflow-y-scroll h-full no-scrollbar ${styles.feedScreen}`}>
                    <FeedScreen />
                </div>

                {/* StoriesScreen takes up 20% width and scrolls independently */}
                <div className={`w-1/5 overflow-y-scroll h-full no-scrollbar ${styles.storiesScreen}`}>
                    <StoriesScreen />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
