const BillingManagement = () => {
    return (
        <section id="billing" className="min-h-screen bg-white text-gray-900">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Payment & Billing Management</h2>

                {/* Revenue Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Revenue", value: "$124,592", info: "+12.5% from last month", color: "text-green-600" },
                        { title: "Active Subscriptions", value: "1,234", info: "+48 new this month", color: "text-blue-600" },
                        { title: "Pending Invoices", value: "23", info: "$4,582 total value", color: "text-yellow-600" },
                        { title: "Failed Payments", value: "7", info: "Action required", color: "text-red-600" },
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                            <h3 className="text-sm text-gray-600 mb-2">{item.title}</h3>
                            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                            <p className={`text-sm mt-2 ${item.color}`}>{item.info}</p>
                        </div>
                    ))}
                </div>

                {/* Subscription Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Active Subscriptions</h3>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Add New Plan</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Premium Plan", users: "856 active users", price: "$49.99/month" },
                                { name: "Basic Plan", users: "1,242 active users", price: "$19.99/month" },
                            ].map((plan, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-800">{plan.name}</h4>
                                        <p className="text-sm text-gray-500">{plan.users}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-800">{plan.price}</p>
                                        <button className="text-sm text-blue-600 hover:text-blue-500">Manage</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Recent Transactions</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="text-sm text-gray-600">
                                    <tr className="border-b border-gray-300">
                                        <th className="text-left pb-3">User</th>
                                        <th className="text-left pb-3">Amount</th>
                                        <th className="text-left pb-3">Date</th>
                                        <th className="text-left pb-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        { user: "john.doe@example.com", amount: "$49.99", date: "Today", status: "Completed", statusColor: "text-green-600" },
                                        { user: "jane.smith@example.com", amount: "$19.99", date: "Yesterday", status: "Failed", statusColor: "text-red-600" },
                                    ].map((transaction, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="py-3 text-gray-700">{transaction.user}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.date}</td>
                                            <td><span className={transaction.statusColor}>{transaction.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Invoice Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Generate Invoice</h3>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">User Email</label>
                                <input type="email" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter user email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Amount</label>
                                <input type="number" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter amount" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                                <textarea className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" rows="3" placeholder="Enter invoice description"></textarea>
                            </div>
                            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Generate Invoice</button>
                        </form>
                    </div>

                    {/* Payment Settings */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Payment Settings</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-medium mb-4 text-gray-800">Payment Methods</h4>
                                <div className="space-y-3">
                                    {[
                                        { method: "Credit Card", checked: true },
                                        { method: "PayPal", checked: true },
                                        { method: "Bank Transfer", checked: false },
                                    ].map((payment, index) => (
                                        <label key={index} className="flex items-center text-gray-700">
                                            <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked={payment.checked} />
                                            <span className="ml-2 text-sm">{payment.method}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-4 text-gray-800">Currency Settings</h4>
                                <select className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                                    {[
                                        "USD - US Dollar",
                                        "EUR - Euro",
                                        "GBP - British Pound",
                                    ].map((currency, index) => (
                                        <option key={index}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BillingManagement;
