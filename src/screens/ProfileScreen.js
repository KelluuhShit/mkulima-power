import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import profileImg from '../assets/profileImg.jpg';
import Skeleton from '../components/Skeleton';
import PostCreator from '../components/PostCreator'; // Import the refactored PostCreator component

const ProfileScreen = () => {
    const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state here

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/signin', { replace: true });
    };

    useEffect(() => {
        const fetchUsername = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userDoc);
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setUsername(data.username);
                    setIsLoading(false);
                } else {
                    console.log('No such document!');
                    setIsLoading(false);
                }
            } else {
                console.log('No user is signed in.');
                setIsLoading(false);
            }
        };
        fetchUsername();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImageSrc(imageUrl);
        }
        e.target.value = null;
    };

    const handleCreatePost = (postData) => {
        console.log('Post Created:', postData);
        // Handle the post creation logic (e.g., saving to Firebase)
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[rgb(166,212,159)] flex flex-col">
            {isLoading ? (
                <Skeleton width="70%" height="20px" className="ml-2 mt-5" />
            ) : (
                <p className="text-lg text-[rgb(82,42,39)] ml-2 mt-5 text-center">
                    Manage your profile and settings here.
                </p>
            )}

            <div className="flex flex-row items-center justify-center text-center mt-5 mb-1">
                {isLoading ? (
                    <Skeleton width="64px" height="64px" className="rounded-full" />
                ) : (
                    <img
                        src={profileImg}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                )}

                <div
                    className="bg-[rgb(156,179,128)] w-16 h-16 relative cursor-pointer rounded-full z-1 -translate-x-3"
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                    />
                    {isLoading ? (
                        <Skeleton width="100%" height="64px" className="rounded-full" />
                    ) : uploadedImageSrc ? (
                        <img
                            src={uploadedImageSrc}
                            alt="Selected"
                            className="absolute inset-0 w-full h-full rounded-full object-cover z-0"
                        />
                    ) : (
                        <span className="flex items-center justify-center h-full text-gray-500">
                            <i className="fa-regular fa-image"></i>
                        </span>
                    )}
                </div>
            </div>

            <p className="text-lg text-[rgb(82,42,39)] mt-5 text-center">
                {isLoading ? (
                    <Skeleton width="150px" height="20px" className="mx-auto" />
                ) : (
                    `My ID: ${username}`
                )}
            </p>

            <div className="flex flex-col">
                {isLoading ? (
                    Array.from({ length: 7 }).map((_, index) => (
                        <Skeleton key={index} width="90%" height="40px" className="ml-2 m-2" />
                    ))
                ) : (
                    [
                        { icon: "fa-circle-plus", label: "Create Post" },
                        { icon: "fa-square-rss", label: "News Feed" },
                        { icon: "fa-comments", label: "Messages" },
                        { icon: "fa-user-group", label: "Friends" },
                        { icon: "fa-object-group", label: "Forums" },
                        { icon: "fa-microphone-lines", label: "Meet" },
                        { icon: "fa-gear", label: "Customize" }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`ml-2 m-2 py-2 rounded-lg cursor-pointer ${
                                activeIndex === index
                                    ? 'bg-[rgb(82,42,39)]'
                                    : 'bg-[rgb(199,62,29)] hover:bg-[rgb(82,42,39)]'
                            } text-white`}
                            onClick={() => {
                                setActiveIndex(index);
                                if (item.label === 'Create Post') setIsModalOpen(true);
                            }}
                        >
                            <div className="flex flex-row items-center ml-2">
                                <i className={`fa-solid ${item.icon}`}></i>
                                <p className="ml-2">{item.label}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button onClick={handleLogout} className="text-[rgb(199,62,29)] hover:underline">
                Logout
            </button>

            {/* PostCreator Modal */}
            {isModalOpen && (
                <PostCreator 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreatePost}
                />
            )}
        </div>
    );
};

export default ProfileScreen;
