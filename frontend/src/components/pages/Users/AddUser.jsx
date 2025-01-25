import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AddUser = () => {

  const appUri = import.meta.env.VITE_API_URL;

  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Fetch User Role
  const fetchUserRole = useCallback(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    } else {
      console.error("No auth token found in local storage.");
    }
  }, []);

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${appUri}/roles/${userRole}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          const availableRoles = response.data.permissions.filter((perm) =>
            perm.actions.includes("create")
          );
          setRoles(availableRoles);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchUserRole();
    fetchRoles();
  }, [userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${appUri}/sendOtp`, {
        email,
      });
      if (response.data.success) {
        alert("OTP sent successfully!");
        navigate("/verify-otp", {
          state: { name, email, password, confirmPassword, role: selectedRole },
        }); // Pass user details to the verify page
      } else {
        alert(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSendOtp}>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 text-sm font-medium">
            Select Role
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Select Role --</option>
            {roles.map((role) => (
              <option key={role._id} value={role.resource}>
                {role.resource}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default AddUser;
