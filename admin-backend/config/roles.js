const roles = {
    super_admin: {
      permissions: {
        admin: ["create", "view", "update", "delete"],
        moderator: ["create", "view", "update", "delete"],
        support_staff: ["create", "view", "update", "delete"],
        user: ["create", "view", "update", "delete"],
        mfa: true,
        broadcast_messages: ["yes"],
        push_notifications: ["yes"]
      }
    },
    moderator: {
      permissions: {
        moderator: ["view"],
        support_staff: ["create", "view", "update", "delete"],
        user: ["view", "update"],
        mfa: false,
        broadcast_messages: ["yes"],
        push_notifications: ["yes"]
      }
    },
    support_staff: {
      permissions: {
        support_staff: ["view"],
        user: ["view"],
        mfa: false,
        broadcast_messages: ["yes"],
      },
    },
  };
  
  module.exports = roles;
  