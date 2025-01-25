import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import AddUser from "./AddUser";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [availableRoles, setAvailableRoles] = useState(["All Roles"]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const appUri = import.meta.env.VITE_API_URL;

  const ITEMS_PER_PAGE = 5;

  const roleAccess = useCallback(
    (roleTo, action) =>
      permissions.some(
        (perm) => perm.resource === roleTo && perm.actions.includes(action)
      ),
    [permissions]
  );

  const fetchUserRole = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${appUri}/get`);
      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const fetchPermissions = async () => {
    if (!userRole) return;
    try {
      const { data } = await axios.get(`${appUri}/roles/${userRole}`);
      setPermissions(data.permissions || []);

      const rolesWithViewAccess = data.permissions
        .filter((perm) => perm.actions.includes("view"))
        .map((perm) => perm.resource);

      setAvailableRoles(() => ["All Roles", ...rolesWithViewAccess]);
    } catch (error) { 
      console.error("Error fetching permissions:", error.message);
    }
  };

  useEffect(() => {
    fetchUserRole();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchPermissions();
  }, [userRole]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = searchQuery
        ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesStatus =
        statusFilter === "All Status" || user.accountStatus === statusFilter;

      const matchesRole =
        roleFilter === "All Roles" || user?.role?.role === roleFilter;

      const roleAccessFilter =
        userRole === "support_staff"
          ? ["support_staff", "user"].includes(user?.role?.role)
          : true;

      return matchesSearch && matchesStatus && matchesRole && roleAccessFilter;
    });
  }, [users, searchQuery, statusFilter, roleFilter, userRole]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  function hasPermission(action) {
    return permissions.some((perm) => perm.actions.includes(action));
  }

  const handleAddUser = () => {
    if (!hasPermission("create")) {
      alert("You do not have permission to add users.");
      return;
    }
    navigate("/addNewUser");
  };

  const handleAction = (id, action) => {
    if (!roleAccess(userRole, action.toLowerCase())) {
      alert(`You do not have permission to ${action.toLowerCase()}.`);
      return;
    }
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                action === "Approve"
                  ? "Active"
                  : action === "Suspend"
                  ? "Suspended"
                  : action === "Activate"
                  ? "Active"
                  : user.accountStatus,
            }
          : user
      )
    );

    if (action === "Delete") {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    }
  };

  return (
    <section id="user-management" className="p-6">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200/30 mb-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <input
            type="search"
            placeholder="Search users..."
            className="w-full md:w-1/3 pl-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option>Pending</option>
            <option value="inactive">Suspended</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {hasPermission("create") && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleAddUser}
            >
              Add User
            </button>
          )}
        </div>
        {addUser && (
          <div className="absolute lg:left-64 top-10 bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            <AddUser />
          </div>
        )}
      </div>

      {/* Table */}
      {/* Add your table component here */}
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
                <tr key={user._id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-sm text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">----------------</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.accountStatus === "active"
                          ? "bg-green-100 text-green-800"
                          : user.accountStatus === "inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.accountStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user?.role?.role  || "NA"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-3">
                      {roleAccess(user?.role?.role, "update") && <button
                        onClick={() => handleAction(user?.role?.role, "update")}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>}
                      
                      {roleAccess(user?.role?.role, "delete") && <button
                        onClick={() => handleAction(user?.role?.role, "delete")}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>}
                      
                      {user?.status === "Pending" ? (
                        <button
                          onClick={() => handleAction(user._id, "Approve")}
                          className="text-green-500 hover:text-green-700"
                        >
                          Approve
                        </button>
                      ) : user?.status === "Suspended" || user?.accountStatus === "inactive" ? (
                        <button
                          onClick={() => handleAction(user._id, "Activate")}
                          className="text-green-500 hover:text-green-700"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user._id, "Suspend")}
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          Suspend
                        </button>
                      )}
                      {
                        (userRole === "super_admin") && (user?.accountStatus === "active" ? 
                        (<button
                            onClick={() => handleAction(user._id, "Suspend")}
                            className="text-red-600 hover:text-red-900"
                          >
                            Inactivate {user?.role?.role}
                          </button>) : 
                          (
                            <button
                              onClick={() => handleAction(user._id, "Activate")}
                              className="text-green-500 hover:text-green-700"
                            >
                              Activate {user?.role?.role}
                            </button>
                        ))
                      }
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <span>
          Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredUsers.length)} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
          {filteredUsers.length} results
        </span>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border border-neutral-200/30 hover:bg-neutral-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserManagement;