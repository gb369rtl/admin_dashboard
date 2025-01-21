const SecuritySection = () => {
  return (
    <section id="security" className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Security & Access Control</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Management */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Role Management</h3>
            <div className="space-y-4">
              {[
                {
                  role: "Super Admin",
                  description: "Full system access and control",
                },
                {
                  role: "Moderator",
                  description: "Content moderation and user management",
                },
                {
                  role: "Support Staff",
                  description: "User support and basic content access",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{item.role}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                    Manage Access
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Two-Factor Authentication</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">2FA Status</h4>
                  <p className="text-sm text-gray-600">Currently enabled for all admins</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-600">Authentication Methods</h4>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Authenticator App", checked: true },
                    { label: "SMS Verification", checked: true },
                    { label: "Email Verification", checked: false },
                  ].map((method, index) => (
                    <label key={index} className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-600"
                        defaultChecked={method.checked}
                      />
                      <span className="ml-2 text-sm">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Audit Logs</h3>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-sm text-gray-600">
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3">Action</th>
                      <th className="text-left pb-3">User</th>
                      <th className="text-left pb-3">Timestamp</th>
                      <th className="text-left pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      {
                        action: "User Profile Update",
                        user: "admin@system.com",
                        timestamp: "2 mins ago",
                        status: "Success",
                        statusColor: "text-green-500",
                      },
                      {
                        action: "Login Attempt",
                        user: "moderator@system.com",
                        timestamp: "5 mins ago",
                        status: "Failed",
                        statusColor: "text-red-500",
                      },
                      {
                        action: "Permission Change",
                        user: "admin@system.com",
                        timestamp: "10 mins ago",
                        status: "Success",
                        statusColor: "text-green-500",
                      },
                    ].map((log, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200"
                      >
                        <td className="py-3">{log.action}</td>
                        <td>{log.user}</td>
                        <td>{log.timestamp}</td>
                        <td className={log.statusColor}>{log.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="w-full px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm">
                View All Logs
              </button>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Security Alerts</h3>
            <div className="space-y-4">
              {[
                {
                  title: "Multiple Failed Login Attempts",
                  description: "3 failed attempts from IP: 192.168.1.1",
                  priority: "High Priority",
                  priorityColor: "text-red-500",
                  bgColor: "bg-red-100",
                },
                {
                  title: "New Device Login",
                  description: "New login from Windows Device",
                  priority: "Medium Priority",
                  priorityColor: "text-yellow-500",
                  bgColor: "bg-yellow-100",
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`${alert.bgColor} p-4 border border-red-200 rounded-lg shadow-sm`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h4 className={`font-medium ${alert.priorityColor}`}>
                        {alert.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {alert.description}
                      </p>
                    </div>
                    <span
                      className={`text-xs bg-red-500/20 px-2 py-1 rounded ${alert.priorityColor}`}
                    >
                      {alert.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            {
              title: "Failed Login Attempts",
              value: "23",
              description: "Last 24 hours",
              color: "text-red-500",
            },
            {
              title: "Active Sessions",
              value: "12",
              description: "Currently online",
              color: "text-blue-500",
            },
            {
              title: "Security Score",
              value: "92%",
              description: "System security rating",
              color: "text-green-500",
            },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <h4 className="text-lg font-semibold mb-2 text-gray-800">{metric.title}</h4>
              <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
