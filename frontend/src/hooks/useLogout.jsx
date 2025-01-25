import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const appUri = import.meta.env.VITE_API_URL;

  const logout = async () => {
    try {
      const response = await axios.post(`${appUri}/logout`, {}, { withCredentials: true });
      if (response.data.success) {
        // Clear local storage or state
        localStorage.removeItem('authToken');
        localStorage.removeItem('tempSession');
        localStorage.removeItem('userRole');

        // Navigate to the login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return logout;
};

export default useLogout;
