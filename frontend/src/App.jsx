// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/pages/auth/ProtectedRoute";

import LoginForm from "./Login/LoginForm";
import MfaVerificationPage from "./Login/MfaVerificationPage";
import EnableMFA from "./Login/EnableMFA";
import EnableAuthenticatorPage from './Login/mfa';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AddUser from "./components/pages/Users/AddUser";
import VerifyOtp from "./components/pages/Users/VerifyOtp";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Flow */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/mfa" element={<MfaVerificationPage />} />
        <Route path="/mfa-setup" element={<EnableAuthenticatorPage />} />
        <Route path="/not-mfa" element={<EnableMFA />} />

        {/* Protected Admin Panel */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addNewUser"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <ProtectedRoute>
              <VerifyOtp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;




