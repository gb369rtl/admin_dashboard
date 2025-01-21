import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      location: "New York, USA",
      status: "Active",
      role: "User",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      location: "London, UK",
      status: "Pending",
      role: "Talent",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      location: "Toronto, CA",
      status: "Suspended",
      role: "Moderator",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      location: "Berlin, Germany",
      status: "Active",
      role: "User",
    },
    {
      id: 5,
      name: "Chris Lee",
      email: "chris@example.com",
      location: "Sydney, Australia",
      status: "Pending",
      role: "Talent",
    },
    {
      id: 6,
      name: "Anna White",
      email: "anna@example.com",
      location: "Paris, France",
      status: "Suspended",
      role: "User",
    },
    {
      id: 7,
      name: "Tom Wilson",
      email: "tom@example.com",
      location: "Dubai, UAE",
      status: "Active",
      role: "Moderator",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "New User",
      email: "newuser@example.com",
      location: "Unknown",
      status: "Pending",
      role: "User",
    };
    setUsers([...users, newUser]);
  };

  const handleAction = (id, action) => {
    if (action === "Delete") {
      setUsers(users.filter((user) => user.id !== id));
    } else if (action === "Edit") {
      alert(`Edit functionality for user ID ${id}`);
    } else if (action === "Approve") {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: "Active" } : user
        )
      );
    } else if (action === "Suspend") {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: "Suspended" } : user
        )
      );
    } else if (action === "Activate") {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, status: "Active" } : user
        )
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "All Status" || user.status === statusFilter) &&
      (roleFilter === "All Roles" || user.role === roleFilter)
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section id="user-management" className="p-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200/30 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="search"
                placeholder="Search users by name, skill, or location..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200/30 rounded-lg focus:outline-none focus:border-neutral-300"
                value={searchQuery}
                onChange={handleSearch}
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-2 border border-neutral-200/30 rounded-lg bg-white"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
            <select
              className="px-4 py-2 border border-neutral-200/30 rounded-lg bg-white"
              value={roleFilter}
              onChange={handleRoleFilter}
            >
              <option>All Roles</option>
              <option>User</option>
              <option>Talent</option>
              <option>Moderator</option>
            </select>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-neutral-200/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200/30">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/30">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-sm text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAction(user.id, "Edit")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleAction(user.id, "Delete")}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                      {user.status === "Pending" ? (
                        <button
                          onClick={() => handleAction(user.id, "Approve")}
                          className="text-green-500 hover:text-green-700"
                        >
                          Approve
                        </button>
                      ) : user.status === "Suspended" ? (
                        <button
                          onClick={() => handleAction(user.id, "Activate")}
                          className="text-green-500 hover:text-green-700"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user.id, "Suspend")}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-neutral-200/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-neutral-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> results
              </span>
            </div>
            <div className="flex space-x-2">
            {/* Previous Button */}
            {currentPage > 1 && <button
              className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-neutral-50"
              onClick={handlePrevPage}
            >
              Previous
            </button>}
            

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "border border-neutral-200/30 hover:bg-neutral-50"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            {currentPage < totalPages && <button
              className="px-3 py-1 border border-neutral-200/30 rounded-lg hover:bg-neutral-50"
              onClick={handleNextPage}
            >
              Next
            </button>}
            
          </div>
	 </div>
        </div>
      </div>
    </section>
  );
};


export default UserManagement;
