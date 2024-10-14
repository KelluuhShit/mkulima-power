// ProfileImageUpload.js
import React from 'react';
import Skeleton from '../components/Skeleton';

const ProfileImageUpload = ({ 
    isLoading, 
    profileImg, 
    uploadedImageSrc, 
    handleImageUpload, 
    width = "64px",  // Default size if not provided
    height = "64px"  // Default size if not provided
    
  }) => {

    
    return (
      <div className="flex flex-row items-center justify-center text-center mt-5 mb-1">
        {isLoading ? (
          <Skeleton width={width} height={height} className="rounded-full" />
        ) : (
          <img
            src={profileImg}
            alt="Profile"
            className="object-cover rounded-full"
            style={{ width, height }}  // Apply dynamic width and height
          />
        )}
  
        <div
          className="bg-[rgb(156,179,128)] relative cursor-pointer rounded-full z-1 -translate-x-3"
          style={{ width, height }} // Apply dynamic width and height
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
            <Skeleton width="100%" height={height} className="rounded-full" />
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
    );
  };
  

export default ProfileImageUpload;
