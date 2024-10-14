import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImageUpload from '../components/ProfileImageUpload';
import profileImg from '../assets/profileImg.jpg';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error
  const [isLoading, setIsLoading] = useState(false); // State for image upload loading
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null); // State to hold uploaded image

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts'); // Make sure this endpoint exists
        setPosts(response.data); // Set posts state with the fetched data
      } catch (err) {
        setError(err); // Set error state if there is an error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true); // Start loading state
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageSrc(reader.result); // Set the uploaded image source
        setIsLoading(false); // Stop loading state
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching posts: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[rgb(166,212,159)] flex flex-col text-center">
      <div className='bg-[rgb(166,212,159)] w-full md:w-3/5 flex flex-col fixed p-5 text-xl gap-5'>
        {/* user navigation on small screens */}
        <div className='flex flex-row justify-between items-center p-4 w-full md:hidden'>
            <div className='flex items-center border-solid cursor-pointer'>
              <i className="fa-solid fa-bars-staggered"></i>
            </div>
            <div>
              <ProfileImageUpload
                isLoading={isLoading}
                profileImg={profileImg}
                uploadedImageSrc={uploadedImageSrc}
                handleImageUpload={handleImageUpload}
                width="40px"
                height="40px"
              />
            </div>
          </div>


        <div className='flex flex-row justify-between'>
          <p className='font-bold'>Feed</p>
          <div className='flex flex-row gap-5'>
            <p className='hover:underline cursor-pointer'>Recents</p>
            <p className='hover:underline cursor-pointer'>Popular</p>
          </div>
        </div>
      </div>

      {/* Display posts here */}
      <div className="mt-20 pt-20">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 m-2 rounded">
            <p className="font-bold">{post.user_id}</p> {/* Display user ID */}
            <p>{post.text}</p> {/* Display post text */}
            {post.image_url && (
              <img
                src={`http://localhost:3000${post.image_url}`} // Add base URL
                alt="Post"
                className="w-full h-auto mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedScreen;
