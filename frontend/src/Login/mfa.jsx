
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnableAuthenticatorPage = () => {
  const tempSession = JSON.parse(localStorage.getItem("tempSession"));
  const email = tempSession?.email;
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const appUri = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMfaSetup = async () => {
      if (!email) {
        setErrorMessage("Invalid session. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${appUri}/setupMFA`, { email }, {
          withCredentials: true,
        });
        setQrCodeUrl(response.data.qrCode);
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Error fetching MFA setup details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMfaSetup();
  }, [email]);

  const handleMfaVerification = async (e) => {
    e.preventDefault();
    const token = e.target.token.value.trim();

    if (token.length !== 6 || isNaN(token)) {
      setErrorMessage("Invalid token. Please enter a valid 6-digit code.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(`${appUri}/verify-mfa-setup`, { token, email }, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/"); // Redirect to dashboard after successful verification
      } else {
        setErrorMessage(response.data.message || "Verification failed. Try again.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error verifying MFA token.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Set Up Multi-Factor Authentication
        </h2>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : errorMessage ? (
          <div className="mb-4 p-2 text-red-600 border border-red-500 bg-red-100 rounded">
            {errorMessage}
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <p className="text-lg mb-2">
                Scan the QR code below with your authenticator app:
              </p>
              <img src={qrCodeUrl} alt="QR Code for MFA" className="w-64 h-64 mx-auto" />
            </div>

            <form onSubmit={handleMfaVerification}>
              <div className="mb-4">
                <label htmlFor="token" className="block text-sm font-medium">
                  Enter the 6-digit code from your authenticator app
                </label>
                <input
                  type="text"
                  id="token"
                  name="token"
                  className="mt-1 block w-full px-4 text-black py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
              >
                Verify MFA Code
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                If you have any issues, you can always{" "}
                <a href="/support" className="text-blue-500 hover:underline">
                  contact support
                </a>
                .
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnableAuthenticatorPage;
