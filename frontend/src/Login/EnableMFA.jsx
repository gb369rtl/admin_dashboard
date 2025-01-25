// import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EnableMFA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { daysLeft } = location.state || { daysLeft: 15 }; // Default to 15 days if no state is provided.

  const handleSkip = () => {
    navigate('/'); // Navigate to dashboard
  };

  const handleEnableMFA = () => {
    navigate('/mfa-setup'); // Navigate to MFA setup page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Enable Multi-Factor Authentication</h1>
        <p className="text-lg">
          For enhanced security, you must enable MFA. If you skip, your account will become inactive in <span className="text-red-500 font-semibold">{daysLeft}</span> day{daysLeft !== 1 ? 's' : ''}.
        </p>
        <p className="mt-2 text-yellow-400"> Its quick and ensures your account stays secure. </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="bg-gray-700 px-6 py-3 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Skip for Now
        </button>

        {/* Enable button */}
        <button
          onClick={handleEnableMFA}
          className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Enable MFA
        </button>
      </div>

      {/* Warning message */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          Skipping MFA will mark your account inactive in <span className="text-red-500">{daysLeft}</span>{' '}
          day{daysLeft !== 1 ? 's' : ''} if not enabled. Secure your account today!
        </p>
      </div>
    </div>
  );
};

export default EnableMFA;
