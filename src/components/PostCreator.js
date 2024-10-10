import React from 'react';
import CreatePostModal from './CreatePostModal'; // Import the modal

const PostCreator = ({ isOpen, onClose, onSubmit }) => {
    return (
        <>
            {isOpen && (
                <CreatePostModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSubmit={onSubmit}
                />
            )}
        </>
    );
};

export default PostCreator;
