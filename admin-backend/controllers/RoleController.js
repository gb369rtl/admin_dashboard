const Role = require('../models/Role');
const Admin = require('../models/Admin');

// Fetch all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch roles', error });
  }
};

// // Create or update a role
// exports.upsertRole = async (req, res) => {
//   const { role, permissions, mfa, broadcast_messages, push_notifications, custom_data } = req.body;

//   try {
//     const updatedRole = await Role.findOneAndUpdate(
//       { role },
//       { permissions, mfa, broadcast_messages, push_notifications, custom_data },
//       { new: true, upsert: true } // Create if not exists, update otherwise
//     );
//     res.status(200).json({ success: true, data: updatedRole });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to create or update role', error });
//   }
// };

// Delete a role
exports.deleteRole = async (req, res) => {
  const { role } = req.params;

  try {
    const deletedRole = await Role.findOneAndDelete({ role });
    if (!deletedRole) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete role', error });
  }
};

// Assign a role to an admin
exports.assignRoleToAdmin = async (req, res) => {
  const { adminId, roleId } = req.body;

  try {
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { role: roleId },
      { new: true }
    ).populate('role');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to assign role to admin', error });
  }
};

// Fetch an admin's role and permissions
exports.getAdminRoleAndPermissions = async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId).populate('role');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin role and permissions', error });
  }
};























exports.getRolePermissions = async (req, res) => {
    try {
        const { role } = req.params; // Role to fetch permissions for
        const roleData = await Role.findOne({ role });
        if (!roleData) {
            return res.status(404).json({
                success: false, 
                message: 'Role not found'
            });
        }

        res.status(200).json({
        success: true,
        permissions: roleData.permissions,
        mfa: roleData.mfa,
        broadcast_messages: roleData.broadcast_messages,
        push_notifications: roleData.push_notifications,
        custom_data: roleData.custom_data,
        change: roleData.change,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

exports.updateRolePermissions = async (req, res) => {
    try {
        const { role } = req.body; // Role to update
        const { permissions, mfa, broadcast_messages, push_notifications, custom_data, change } = req.body;

        // If role is 'super_admin', set 'change' to true, or leave it unchanged
        let updateChange = change;
        if (role === 'super_admin') {
            updateChange = true; // You can set it to true directly or leave it unchanged if needed
        }

        const roleData = await Role.findOneAndUpdate(
            { role },
            {
                $set: {
                    permissions,
                    mfa,
                    broadcast_messages,
                    push_notifications,
                    custom_data,
                    change: updateChange, // Use modified change value
                },
            },
            { new: true } // Return updated document
        );

        if (!roleData) {
            return res.status(404).json({ success: false, message: 'Role not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Permissions updated successfully',
            role: roleData,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};

