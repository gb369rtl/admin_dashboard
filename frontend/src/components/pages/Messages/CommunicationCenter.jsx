import { useState, useEffect } from "react";

const CommunicationCenter = () => {
    // State to store the broadcasts
    const [broadcasts, setBroadcasts] = useState([]);
    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [message, setMessage] = useState("");
    const [sendEmail, setSendEmail] = useState(false);
    const [sendPushNotification, setSendPushNotification] = useState(false);

    // Dummy data for recent broadcasts
    const dummyData = [
        {
            title: "System Maintenance Notice",
            message: "Scheduled maintenance will be performed on Saturday at 2 AM UTC.",
            timestamp: "2025-01-20 12:30 PM",
            emailSent: true,
            pushNotificationSent: true,
        },
        {
            title: "New Feature Announcement",
            message: "We've launched our new talent matching algorithm!",
            timestamp: "2025-01-19 03:00 PM",
            emailSent: true,
            pushNotificationSent: false,
        },
        {
            title: "Weekly Newsletter",
            message: "This week's highlights include new job opportunities and a blog update.",
            timestamp: "2025-01-18 09:15 AM",
            emailSent: false,
            pushNotificationSent: true,
        },
    ];

    // Initialize with dummy data
    useEffect(() => {
        setBroadcasts(dummyData);
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new broadcast object
        const newBroadcast = {
            title: announcementTitle.trim(),
            message: message.trim(),
            timestamp: new Date().toLocaleString(), // Current timestamp
            emailSent: sendEmail,
            pushNotificationSent: sendPushNotification,
        };

        // Validate required fields
        if (!newBroadcast.title || !newBroadcast.message) {
            alert("Announcement Title and Message are required!");
            return;
        }

        // Add the new broadcast to the list of broadcasts
        setBroadcasts([newBroadcast, ...broadcasts]);

        // Reset the form fields
        setAnnouncementTitle("");
        setMessage("");
        setSendEmail(false);
        setSendPushNotification(false);
    };

    // Handle delete
    const handleDelete = (index) => {
        const updatedBroadcasts = broadcasts.filter((_, i) => i !== index);
        setBroadcasts(updatedBroadcasts);
    };

    return (
        <div id="root">
            <section id="communication" className="min-h-screen bg-white text-neutral-900">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-8 text-yellow-600">Communication Center</h2>

                    {/* Communication Tools Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Broadcast Messages */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg p-6 border border-neutral-200 mb-6 shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Broadcast Announcement</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-neutral-800">Announcement Title</label>
                                        <input
                                            type="text"
                                            className="w-full bg-neutral-100 border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                                            placeholder="Enter announcement title"
                                            value={announcementTitle}
                                            onChange={(e) => setAnnouncementTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-neutral-800">Message</label>
                                        <textarea
                                            className="w-full bg-neutral-100 border border-neutral-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:border-yellow-500"
                                            placeholder="Enter your message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox bg-neutral-100 border-neutral-300"
                                                checked={sendEmail}
                                                onChange={() => setSendEmail(!sendEmail)}
                                            />
                                            <span className="ml-2 text-sm">Send as Email</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox bg-neutral-100 border-neutral-300"
                                                checked={sendPushNotification}
                                                onChange={() => setSendPushNotification(!sendPushNotification)}
                                            />
                                            <span className="ml-2 text-sm">Send as Push Notification</span>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition duration-200"
                                    >
                                        Send Broadcast
                                    </button>
                                </form>
                            </div>

                            {/* Recent Broadcasts */}
                            <div className="bg-white rounded-lg p-6 border border-neutral-200 shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Recent Broadcasts</h3>
                                <div className="space-y-4">
                                    {broadcasts.map((broadcast, index) => (
                                        <div key={index} className="border-b border-neutral-200 pb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-neutral-900">{broadcast.title}</h4>
                                                <span className="text-xs text-neutral-400">{broadcast.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-neutral-600 mb-2">{broadcast.message}</p>
                                            <div className="flex space-x-2">
                                                {broadcast.emailSent && (
                                                    <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">
                                                        Email Sent
                                                    </span>
                                                )}
                                                {broadcast.pushNotificationSent && (
                                                    <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">
                                                        Push Notification
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="text-xs text-red-500 hover:text-red-400 mt-2"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Support Tickets */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg p-6 border border-neutral-200 shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Support Tickets</h3>
                                <div className="space-y-4">
                                    <div className="bg-neutral-100/50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-medium text-neutral-900">Account Access Issue</span>
                                            <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded">High Priority</span>
                                        </div>
                                        <p className="text-sm text-neutral-600 mb-2">User unable to login after password reset</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-neutral-400">Ticket #1234</span>
                                            <button className="text-sm text-blue-500 hover:text-blue-400">View Details</button>
                                        </div>
                                    </div>

                                    <div className="bg-neutral-100/50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-medium text-neutral-900">Talent Upload Problem</span>
                                            <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Medium Priority</span>
                                        </div>
                                        <p className="text-sm text-neutral-600 mb-2">Error when uploading portfolio items</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-neutral-400">Ticket #1235</span>
                                            <button className="text-sm text-blue-500 hover:text-blue-400">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-lg p-6 border border-neutral-200 shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Communication Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Open Tickets</span>
                                        <span className="font-semibold text-neutral-900">24</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Broadcasts Today</span>
                                        <span className="font-semibold text-neutral-900">3</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Avg Response Time</span>
                                        <span className="font-semibold text-neutral-900">2.5 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CommunicationCenter;
