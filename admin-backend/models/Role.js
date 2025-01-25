const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  resource: { type: String, required: true }, // e.g., 'admin', 'moderator', 'user'
  actions: [{ type: String }], // e.g., ['create', 'view', 'update', 'delete']
  dynamic: { type: Boolean, default: false },
});

const roleSchema = new mongoose.Schema({
  role: { type: String, enum: ['super_admin', 'moderator', 'support_staff'], required: true },
  permissions: [permissionSchema], // Structured list of permissions
  mfa: { type: Boolean, default: false }, // Multi-Factor Authentication flag
  broadcast_messages: { type: Boolean, default: false },
  push_notifications: { type: Boolean, default: false },
  custom_data: { type: mongoose.Schema.Types.Mixed }, // To store flexible data
  change: { type: Boolean, default: false },
});

module.exports = mongoose.model('Role', roleSchema);
