
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const appUri = import.meta.env.VITE_API_URL;

  const { name, email, password, confirmPassword, role } = location.state;

  console.log("Location State:", name, email, password, confirmPassword, role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Request Payload:", { name, email, password, confirmPassword, otp, role });

    try {
      const response = await axios.post(`${appUri}/create`, {
        name,
        email,
        password,
        confirmPassword,
        otp,
        role,
      });

      console.log("Response Data:", response);

      if (response.data?.success) {
        alert(`${role} registered successfully!`);
        navigate("/users"); // Redirect to a success page
      } else {
        alert(response.data?.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message || 
          "An error occurred while verifying OTP. Please try again."
        );
      } else {
        alert("Unexpected error occurred. Please check the console.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="otp" className="block mb-2 text-sm font-medium">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded`}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
