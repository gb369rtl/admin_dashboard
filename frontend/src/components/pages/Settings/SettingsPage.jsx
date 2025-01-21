const SettingsPage = () => {
    return (
        <div id="root">
            <section id="settings" className="min-h-screen bg-white text-gray-900">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-8">Platform Settings</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* General Settings */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6">General Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Platform Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                        defaultValue="Talent Match Platform"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Support Email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                        defaultValue="support@platform.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Time Zone</label>
                                    <select
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                    >
                                        <option>UTC</option>
                                        <option>EST</option>
                                        <option>PST</option>
                                        <option>GMT</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Notification Settings */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
                            <div className="space-y-4">
                                {['Email Notifications', 'Push Notifications', 'SMS Notifications'].map((label, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm">{label}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={index !== 2} />
                                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Language Settings */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6">Language & Localization</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Default Language</label>
                                    <select
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                    >
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>German</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Date Format</label>
                                    <select
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                    >
                                        <option>MM/DD/YYYY</option>
                                        <option>DD/MM/YYYY</option>
                                        <option>YYYY/MM/DD</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Two-Factor Authentication</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Session Timeout (minutes)</span>
                                    <input
                                        type="number"
                                        className="w-24 bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                                        defaultValue="30"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Password Expiry (days)</span>
                                    <input
                                        type="number"
                                        className="w-24 bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                                        defaultValue="90"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* API Settings */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6">API Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">API Key</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="password"
                                            className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                            defaultValue="************************"
                                        />
                                        <button className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Regenerate</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">API Rate Limiting</span>
                                    <input
                                        type="number"
                                        className="w-24 bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                                        defaultValue="1000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Backup Settings */}
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6">Backup & Maintenance</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Auto Backup</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">Backup Now</button>
                                <button className="w-full px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-lg">View Backup History</button>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-8 flex justify-end">
                        <button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Save All Settings</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SettingsPage;
