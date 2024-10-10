import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const CreatePostModal = ({ isOpen, onClose }) => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', postText);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Handle response data if needed
      setPostText('');
      setImage(null);
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
