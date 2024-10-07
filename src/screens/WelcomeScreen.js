// src/screens/WelcomeScreen.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/homeImg.png';

const images = [
    'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const WelcomeScreen = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-center relative"
            style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out',
            }}
        >
            {/* Brightness Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20" style={{ filter: 'brightness(0.1)' }}></div>
            
            {/* Overlay Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-lg bg-black bg-opacity-75">
                {/* Responsive Logo */}
                <img 
                    src={logo} 
                    alt="Mkulima Power Logo" 
                    className="mb-6 w-28 h-auto sm:w-40 md:w-48 lg:w-56 xl:w-64" 
                />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[rgb(166,212,159)]">
                    Welcome to Mkulima Power
                </h1>
                <p className="text-md sm:text-lg lg:text-xl mb-8 text-[rgb(166,212,159)]">
                    Empowering Farmers for a Sustainable Future
                </p>
                <div className="flex flex-col items-center space-y-4">
                    <Link to="/signup">
                        <button className="bg-[rgb(199,62,29)] text-white py-3 px-20 sm:py-4 sm:px-40 rounded-lg hover:bg-[rgb(82,42,39)]">
                            Create Account
                        </button>
                    </Link>
                    <div className="flex space-x-4 items-center mb-4">
                        <p className="text-sm sm:text-md text-[rgb(166,212,159)]">Already have an account?</p>
                        <Link to="/signin">
                            <button className="text-[rgb(199,62,29)]">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
