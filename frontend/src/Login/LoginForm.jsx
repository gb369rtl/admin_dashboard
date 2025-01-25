
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const appUri = import.meta.env.VITE_API_URL;

  const LOCAL_STORAGE_KEYS = {
    authToken: "authToken",
    userRole: "userRole",
    tempSession: "tempSession",
  };


  const saveLoginToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.authToken, token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.userRole, decoded.role);
      console.log("Logged in as:", decoded.role);
    } catch (err) {
      console.error("Token decoding failed:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${appUri}/login`,
        { email, password },
        { withCredentials: true }
      );


      const { token, success, mfaEnabled, mfa, tempSession, message } = response.data;

      if (success) {
        saveLoginToken(token);

        const sessionData = { email };
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.tempSession,
          JSON.stringify(mfaEnabled ? tempSession : sessionData)
        );

        if(mfa){
          if(mfaEnabled){
            navigate("/mfa");
          }
          else {
            navigate("/not-mfa");
          }
        }
        else {
          navigate("/dashboard");
        }

      } else {
        setError(message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="relative bg-gray-900 h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 backdrop-blur-md border-2 border-white rounded-lg p-12 shadow-xl w-96"
      >
        <h3 className="text-center text-white text-2xl font-medium">Login Here</h3>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <label htmlFor="email" className="text-white mt-6 text-sm font-medium block">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-2 p-3 bg-white bg-opacity-10 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label htmlFor="password" className="text-white mt-6 text-sm font-medium block">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 p-3 bg-white bg-opacity-10 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
