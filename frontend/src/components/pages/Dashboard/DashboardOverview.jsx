
const DashboardOverview = () => {
  const overviewCards = [
    {
      title: 'Total Users',
      count: '2,463',
      percentage: '+12.5%',
      details: { label: 'Active', value: '1,892', progress: 76, color: 'bg-blue-500' },
    },
    {
      title: 'Total Talents',
      count: '1,825',
      percentage: '+8.2%',
      details: { label: 'Approved', value: '1,523', progress: 83, color: 'bg-green-500' },
    },
    {
      title: 'Total Matches',
      count: '956',
      percentage: '+15.3%',
      details: { label: 'Success Rate', value: '78%', progress: 78, color: 'bg-purple-500' },
    },
    {
      title: 'Active Events',
      count: '28',
      percentage: '+5.7%',
      details: { label: 'Participation', value: '89%', progress: 89, color: 'bg-yellow-500' },
    },
  ];

  const recentActivities = [
    {
      label: 'New user registration',
      time: '5 minutes ago',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      iconPath:
        'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      label: 'Talent approved',
      time: '15 minutes ago',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Successful match',
      time: '1 hour ago',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
  ];

  const systemNotifications = [
    {
      label: 'System maintenance scheduled',
      time: 'Tomorrow at 2:00 AM',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-500',
      iconPath:
        'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
    {
      label: 'High server load detected',
      time: '2 hours ago',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      iconPath: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'New system update available',
      time: '3 hours ago',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      iconPath: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
    },
  ];

  return (
    <section id="dashboard-overview" className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <div key={index} className="p-6 bg-white rounded-lg border border-neutral-200/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-neutral-600">{card.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{card.count}</h3>
              </div>
              <span className="text-green-500 text-sm">{card.percentage}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">{card.details.label}</span>
                <span className="font-medium">{card.details.value}</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 mt-2">
                <div
                  className={`${card.details.color} h-2 rounded-full`}
                  style={{ width: `${card.details.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200/30 overflow-hidden">
          <div className="p-6 border-b border-neutral-200/30">
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center`}>
                  <svg
                    className={`w-4 h-4 ${activity.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={activity.iconPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.label}</p>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200/30 overflow-hidden">
          <div className="p-6 border-b border-neutral-200/30">
            <h3 className="font-semibold">System Notifications</h3>
          </div>
          <div className="p-6 space-y-4">
            {systemNotifications.map((notification, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full ${notification.iconBg} flex items-center justify-center`}>
                  <svg
                    className={`w-4 h-4 ${notification.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d={notification.iconPath}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{notification.label}</p>
                  <p className="text-xs text-neutral-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
