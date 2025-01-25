import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MfaVerificationPage = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const appUri = import.meta.env.VITE_API_URL;

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const tempSession = JSON.parse(localStorage.getItem('tempSession'));
      const response = await axios.post(`${appUri}/mfa`, {
        email: tempSession?.email,
        token,
      },
    {
      withCredentials: true,
    });

      if (response.data.success) {
        // Set cookie on backend and proceed
        localStorage.setItem("authToken", response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid MFA token');
    }
  };

  return (
    <div className="relative bg-gray-900 h-screen flex items-center justify-center">
      <form onSubmit={handleVerify} className="bg-white bg-opacity-10 backdrop-blur-md border-2 border-white rounded-lg p-12 shadow-xl w-96">
        <h3 className="text-center text-white text-2xl font-medium">MFA Authentication</h3>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <label className="text-white mt-6 text-sm font-medium">MFA Token</label>
        <input
          type="text"
          placeholder="Enter MFA code"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full mt-2 p-3 bg-opacity-10 rounded-md text-black placeholder-white"
        />

        <button type="submit" className="w-full mt-6 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-200">
          Verify
        </button>
      </form>
    </div>
  );
};

export default MfaVerificationPage;
