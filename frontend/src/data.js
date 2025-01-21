// src/data.js
export const initialData = {
    users: [
      { id: 1, name: "John Doe", email: "john.doe@example.com", role: "user", status: "active" },
    ],
    talents: [
      { id: 1, userId: 1, category: "Programming", title: "Full-Stack Developer", status: "approved" },
    ],
    events: [
      { id: 1, name: "Tech Showcase", date: "2025-02-01", participants: [1] },
    ],
  };
  