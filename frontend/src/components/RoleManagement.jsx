import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const RoleManagement = ({ role, setManageRole }) => {

  const appUri = import.meta.env.VITE_API_URL;

  const [permissions, setPermissions] = useState([]);
  const [additionalSettings, setAdditionalSettings] = useState({
    mfa: false,
    broadcast_messages: false,
    push_notifications: false,
    custom_data: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${appUri}/roles/${role}`).then((response) => {
      setPermissions(response.data.permissions);
      setAdditionalSettings({
        mfa: response.data.mfa,
        broadcast_messages: response.data.broadcast_messages,
        push_notifications: response.data.push_notifications,
        custom_data: response.data.custom_data,
        change: response.data.change,
      });
      setLoading(false);
    });
  }, [role]);

  const handlePermissionChange = (resource, action, checked) => {
    setPermissions((prev) => {
      const updatedPermissions = [...prev];
      const resourceIndex = updatedPermissions.findIndex((p) => p.resource === resource);

      if (resourceIndex > -1) {
        const actions = updatedPermissions[resourceIndex].actions;
        updatedPermissions[resourceIndex].actions = checked
          ? [...actions, action]
          : actions.filter((a) => a !== action);
      } else {
        updatedPermissions.push({ resource, actions: [action] });
      }

      return updatedPermissions;
    });
  };

  const saveChanges = () => {
    axios
      .post(`${appUri}/roles`, { role, ...additionalSettings, permissions })
      .then(() => alert("Role updated successfully!"))
      .catch((error) => console.error(error));
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  const resources = ["moderator", "support_staff", "user"];
  const actions = ["create", "update", "view", "delete"];

  return (
    <div className="p-8">
      <button
          type="button"
          onClick={() => setManageRole(p=>!p)}
          className="px-4 py-2 mb-5 bg-blue-100 text-brown-500 rounded shadow hover:bg-blue-300 transition w-full"
        >
          Close
        </button>
      <h2 className="text-2xl font-semibold mb-4">Manage Access for {role}</h2>
      <form className="space-y-6">
        {resources.map((resource) => (
          <div key={resource} className="border rounded p-4">
            <h3 className="text-lg font-medium mb-2 capitalize">{resource}</h3>
            <div className="flex flex-wrap gap-4">
              {actions.map((action) => (
                <label key={action} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      permissions.find((p) => p.resource === resource)?.actions.includes(action) || false
                    }
                    onChange={(e) =>
                      handlePermissionChange(resource, action, e.target.checked)
                    }
                    className="form-checkbox text-blue-500"
                  />
                  <span className="capitalize">{action}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="border rounded p-4">
          <h3 className="text-lg font-medium mb-2">Additional Settings</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={additionalSettings.mfa}
                onChange={(e) =>
                  setAdditionalSettings((prev) => ({ ...prev, mfa: e.target.checked }))
                }
                className="form-checkbox text-blue-500"
              />
              <span>MFA</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={additionalSettings.broadcast_messages}
                onChange={(e) =>
                  setAdditionalSettings((prev) => ({
                    ...prev,
                    broadcast_messages: e.target.checked,
                  }))
                }
                className="form-checkbox text-blue-500"
              />
              <span>Broadcast Messages</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={additionalSettings.push_notifications}
                onChange={(e) =>
                  setAdditionalSettings((prev) => ({
                    ...prev,
                    push_notifications: e.target.checked,
                  }))
                }
                className="form-checkbox text-blue-500"
              />
              <span>Push Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={additionalSettings.change}
                onChange={(e) =>
                  setAdditionalSettings((prev) => ({
                    ...prev,
                    change: e.target.checked,
                  }))
                }
                className="form-checkbox text-blue-500"
              />
              <span>Change</span>
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={saveChanges}
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-700 transition"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
};

export default RoleManagement;
