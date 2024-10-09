// src/screens/FeedScreen.js

import React from 'react';

const FeedScreen = () => {
  return (
    <div className="min-h-screen bg-[rgb(166,212,159)] flex flex-col  text-center">
        <div className='flex flex-row align-center justify-around mt-5'>
            <p className='font-bold'>Feed</p>
            <div className='flex flex-row gap-5'>
                <p>Recents</p>
                <p>Popular</p>
            </div>
        </div>
    </div>
  );
};

export default FeedScreen;
