// src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";


// Import your components for each section
// import Dashboard from "./components/pages/Dashboard/DashboardOverview";
// import Users from "./components/pages/Users/UserManagement";
// import Talents from "./components/pages/Talents/TalentManagement";
// import Matching from "./components/pages/Matching/MatchingSystem";
// import Events from "./components/pages/Events/EventManagement";
// import Moderation from "./components/pages/Moderation/ContentModeration";
// import Analytics from "./components/pages/Analytics/AnalyticsDashboard";
// import Messages from "./components/pages/Messages/CommunicationCenter";
// import Settings from "./components/pages/Settings/SettingsPage";
// import Security from "./components/pages/Security/SecuritySection";
// import Billing from "./components/pages/Billing/BillingManagement";


const App = () => {
  return (
    <AdminPanel />
    //   <Router>
    //   <div className="">
    //     <AdminPanel />
    //     <main className="">
    //       <Routes>
    //         <Route path="/" element={<Dashboard />} />
    //         <Route path="/users" element={<Users />} />
    //         <Route path="/talents" element={<Talents />} />
    //         <Route path="/matching" element={<Matching />} />
    //         <Route path="/events" element={<Events />} />
    //         <Route path="/moderation" element={<Moderation />} />
    //         <Route path="/analytics" element={<Analytics />} />
    //         <Route path="/messages" element={<Messages />} />
    //         <Route path="/settings" element={<Settings />} />
    //         <Route path="/security" element={<Security />} />
    //         <Route path="/billing" element={<Billing />} />
    //       </Routes>
    //     </main>
    //   </div>
    // </Router>
  );
};

export default App;
