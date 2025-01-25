// import React from 'react';

// eslint-disable-next-line react/prop-types
const WelcomeBack = ({role}) => {
  return (
    <div className="flex items-center justify-center min-h-80 bg-gray-100">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center text-gray-800">
        Welcome back {role}
      </h1>
    </div>
  );
};

export default WelcomeBack;