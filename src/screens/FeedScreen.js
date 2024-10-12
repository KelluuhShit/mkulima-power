import React, { useEffect, useState } from 'react';
import axios from 'axios';


const FeedScreen = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

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
        <div className='w-3/5 flex flex-row justify-between bg-[rgb(166,212,159)] p-5 fixed'>
              <p className='font-bold'>Feed</p>
              <div className='flex flex-row gap-5'>
                <p className='hover:underline cursor-pointer'>Recents</p>
                <p className='hover:underline cursor-pointer'>Popular</p>
              </div>
        </div>

      {/* Display posts here */}
      <div className="mt-5">
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
