const mongoose = require('mongoose');
require("dotenv").config();

const Role = require('../models/Role'); // Adjust the path as per your project structure
const roles = {
  super_admin: {
    permissions: [
      { resource: 'admin', actions: ['create', 'view', 'update', 'delete'], dynamic: false },
      { resource: 'moderator', actions: ['create', 'view', 'update', 'delete'], dynamic: false },
      { resource: 'support_staff', actions: ['create', 'view', 'update', 'delete'], dynamic: false },
      { resource: 'user', actions: ['create', 'view', 'update', 'delete'], dynamic: false },
    ],
    mfa: true,
    broadcast_messages: true,
    push_notifications: true,
    change: true,
  },
  moderator: {
    permissions: [
      { resource: 'moderator', actions: ['view'], dynamic: false },
      { resource: 'support_staff', actions: ['create', 'view', 'update', 'delete'], dynamic: false },
      { resource: 'user', actions: ['view', 'update'], dynamic: false },
    ],
    mfa: false,
    broadcast_messages: true,
    push_notifications: true,
    change: false,
  },
  support_staff: {
    permissions: [
      { resource: 'support_staff', actions: ['view'], dynamic: false },
      { resource: 'user', actions: ['view'], dynamic: false },
    ],
    mfa: false,
    broadcast_messages: true,
    push_notifications: false,
    change: false,
  },
};

const seedRoles = async () => {
  try {
    await mongoose.connect("url/Admin-App", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database.');

    for (const roleName in roles) {
      const roleData = roles[roleName];
      await Role.updateOne(
        { role: roleName }, // Match by role
        { $set: roleData }, // Update with new data
        { upsert: true } // Insert if not found
      );
      console.log(`Seeded role: ${roleName}`);
    }

    console.log('Roles seeding completed.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding roles:', error);
    mongoose.disconnect();
  }
};

seedRoles();
