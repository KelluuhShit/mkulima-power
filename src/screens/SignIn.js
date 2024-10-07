import React from 'react';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
