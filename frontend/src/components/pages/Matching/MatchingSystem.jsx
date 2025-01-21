import { useState } from 'react';

const MatchingSystem = () => {
  // State to manage search input
  const [searchInput, setSearchInput] = useState('');

  // State to manage displayed talents
  const [displayedTalents, setDisplayedTalents] = useState([
    { name: "John Smith", category: "Web Development" },
    { name: "Sarah Johnson", category: "UI/UX Design" },
    { name: "Emily Davis", category: "Music" },
    { name: "Michael Brown", category: "Graphic Design" },
    { name: "Chris Wilson", category: "Web Development" },
    { name: "Jessica Taylor", category: "Music" },
  ]);

  // Original list of talents
  const talents = [
    { name: "John Smith", category: "Web Development" },
    { name: "Sarah Johnson", category: "UI/UX Design" },
    { name: "Emily Davis", category: "Music" },
    { name: "Michael Brown", category: "Graphic Design" },
    { name: "Chris Wilson", category: "Web Development" },
    { name: "Jessica Taylor", category: "Music" },
  ];

  // State to manage match history
  const [matchHistory, setMatchHistory] = useState([
    {
      project: "E-commerce Website",
      date: "Jan 15, 2024",
      status: "Successful",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      project: "Mobile App Design",
      date: "Jan 12, 2024",
      status: "Failed",
      statusColor: "bg-red-100 text-red-800",
    },
  ]);

  // State to manage notifications
  const [notifications, setNotifications] = useState([
    {
      message: "New match found for \"Web Development\"",
      time: "2 minutes ago",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      iconPath: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    },
    {
      message: "Match accepted by both parties",
      time: "1 hour ago",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ]);

  // Function to handle manual matching
  const handleManualMatch = (talent) => {
    const isSuccess = talent.category === "Web Development";
    const newMatch = {
      project: `Matched with ${talent.name}`,
      date: new Date().toLocaleDateString(),
      status: isSuccess ? "Successful" : "Mismatch",
      statusColor: isSuccess ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800",
    };

    // Update match history
    setMatchHistory([newMatch, ...matchHistory]);

    // Send notification
    sendNotification(`Match made with ${talent.name} - ${isSuccess ? 'Success' : 'Mismatch'}`);
  };

  // Function to handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filteredTalents = talents.filter((talent) =>
      talent.name.toLowerCase().includes(value) || talent.category.toLowerCase().includes(value)
    );
    setDisplayedTalents(filteredTalents);
  };

  // Function to send a notification
  const sendNotification = (message) => {
    const newNotification = {
      message: message,
      time: "Just now",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      iconPath: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    };

    setNotifications([newNotification, ...notifications]);
  };

  return (
    <section id="matching-system" className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Manual Matching */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium mb-4">Manual Talent Matching</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Search Talent</label>
                <input
                  type="search"
                  placeholder="Search by skill or category..."
                  value={searchInput}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border border-neutral-200/30 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Match Requirements</label>
                <select className="w-full px-4 py-2 border border-neutral-200/30 rounded-lg">
                  <option>Select Category</option>
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Music</option>
                  <option>Art</option>
                </select>
              </div>
            </div>

            {/* Matching Results */}
            <div className="space-y-4">
              {displayedTalents.map((talent, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-neutral-200/30 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">{talent.name}</h4>
                      <p className="text-xs text-neutral-500">{talent.category}</p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => handleManualMatch(talent)}
                  >
                    Match
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Match History */}
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium mb-4">Match History</h3>
            <div className="space-y-4">
              {matchHistory.map((history, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-neutral-200/30 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium">Project: {history.project}</h4>
                      <p className="text-xs text-neutral-500">Matched on: {history.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${history.statusColor}`}
                  >
                    {history.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Automated Matching & Notifications */}
        <div className="space-y-6">
          {/* Automated Matching Settings */}
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium mb-4">Automated Matching</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">Enable Auto-matching</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Match Criteria</label>
                <select className="w-full px-4 py-2 border border-neutral-200/30 rounded-lg mb-2">
                  <option>Skill Level</option>
                  <option>Location</option>
                  <option>Experience</option>
                </select>
                <select className="w-full px-4 py-2 border border-neutral-200/30 rounded-lg">
                  <option>Availability</option>
                  <option>Project Type</option>
                  <option>Duration</option>
                </select>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Update Settings
              </button>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="bg-white rounded-lg border border-neutral-200/30 p-6">
            <h3 className="text-lg font-medium mb-4">Recent Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full ${notification.iconBg} flex items-center justify-center`}
                  >
                    <svg
                      className={`w-4 h-4 ${notification.iconColor}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={notification.iconPath}
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-neutral-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingSystem;
