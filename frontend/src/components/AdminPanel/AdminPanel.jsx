import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import EventManagement from "../pages/Events/EventManagement";
import MatchingSystem from "../pages/Matching/MatchingSystem";
import UserManagement from "../pages/Users/UserManagement";
import BillingManagement from "../pages/Billing/BillingManagement";
import AnalyticsDashboard from "../pages/Analytics/AnalyticsDashboard";
import CommunicationCenter from "../pages/Messages/CommunicationCenter";
import SecuritySection from "../pages/Security/SecuritySection";
import SettingsPage from "../pages/Settings/SettingsPage";
import ContentModeration from "../pages/Moderation/ContentModeration";
import TalentManagement from "../pages/Talents/TalentManagement";
import WelcomeBack from "../Welcome";
import useLogout from "../../hooks/useLogout";
import { jwtDecode } from "jwt-decode";

const AdminPanel = () => {
  const logout = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const fetchUserRole = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log(decoded);
        setUserRole(decoded.role);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  let navLinks = [];

  if(userRole === "super_admin"){
    navLinks = [
      { to: "/dashboard", label: "Dashboard", icon: "🏠" },
      { to: "/users", label: "Users", icon: "👤" },
      { to: "/talents", label: "Talents", icon: "🎭" },
      { to: "/matching", label: "Matching", icon: "💡" },
      { to: "/events", label: "Events", icon: "📅" },
      { to: "/moderation", label: "Moderation", icon: "🛡️" },
      { to: "/analytics", label: "Analytics", icon: "📊" },
      { to: "/messages", label: "Messages", icon: "✉️" },
      { to: "/settings", label: "Settings", icon: "⚙️" },
      { to: "/security", label: "Security", icon: "🔒" },
      { to: "/billing", label: "Billing", icon: "💳" },
    ];
  }

  if(userRole === "moderator"){
    navLinks = [
      { to: "/dashboard", label: "Dashboard", icon: "🏠" },
      { to: "/users", label: "Users", icon: "👤" },
      { to: "/talents", label: "Talents", icon: "🎭" },
      { to: "/matching", label: "Matching", icon: "💡" },
      { to: "/events", label: "Events", icon: "📅" },
      { to: "/moderation", label: "Moderation", icon: "🛡️" },
      { to: "/messages", label: "Messages", icon: "✉️" },
      { to: "/settings", label: "Settings", icon: "⚙️" },
    ];
  }

  if(userRole === "support_staff"){
    navLinks = [
      { to: "/dashboard", label: "Dashboard", icon: "🏠" },
      { to: "/users", label: "Users", icon: "👤" },
      { to: "/matching", label: "Matching", icon: "💡" },
      { to: "/events", label: "Events", icon: "📅" },
      { to: "/messages", label: "Messages", icon: "✉️" },
    ];
  }


  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className={`bg-white ${isSidebarCollapsed ? "w-20" : "w-64"} flex-shrink-0 transition-all duration-200 border-r border-gray-300 hidden lg:block`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`p-4 border-b border-gray-300 ${isSidebarCollapsed ? "flex-col" : "flex"} justify-between items-center`}>
            <span className="text-xl font-semibold">{userRole} Panel</span>
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-gray-600 hover:text-gray-900">
              {isSidebarCollapsed ? "➡️" : "⬅️"}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                      isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-300"
                    }`
                  }
                  onClick={() => setActiveSection(label)}
                >
                  <span>{isSidebarCollapsed ? icon : `${icon} ${label}`}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-300 relative">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
              {!isSidebarCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium">{userRole} User</p>
                  <p className="text-xs text-gray-600">{userEmail}</p>
                </div>
              )}
            </div>
            {isUserMenuOpen && (
              <div className="absolute bottom-12 left-0 bg-white p-4 rounded-lg shadow-lg space-y-2 border border-gray-300">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300" onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="fixed top-4 left-4 z-20 rounded-lg bg-white p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
          aria-controls="mobile-menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open menu</span>
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div
            className="fixed z-10 bg-white p-4 mt-20 space-y-2 border border-gray-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm ${
                    isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-300"
                  }`
                }
                onClick={() => setActiveSection(label)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-300 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="ml-11 text-xl font-semibold">{activeSection}</h1>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-gray-300"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-20 lg:right-4 top-12 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-gray-300 lg:hidden"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="sr-only">View profile</span>
                <div className="w-6 h-6 rounded-full bg-gray-400"></div>
              </button>
              {isUserMenuOpen && (
                <div className="absolute lg:hidden right-0 top-12 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-300">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="p-4">
          {/* Content will be rendered here based on the selected route */}
          <Routes>
            <Route path="/" element={<WelcomeBack role={userRole} />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/talents" element={<TalentManagement />} />
            <Route path="/matching" element={<MatchingSystem />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/moderation" element={<ContentModeration />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/messages" element={<CommunicationCenter />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/security" element={<SecuritySection />} />
            <Route path="/billing" element={<BillingManagement />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
