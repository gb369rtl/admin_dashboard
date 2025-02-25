const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const announcementRoutes = require('./routes/announcementRoutes');
// const { errorHandler } = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

// Middleware
// app.use(
//     cors({
//       origin: "http://localhost:5173", // Replace with your client domain
//       credentials: true, // Allow credentials (cookies)
//     })
//   );

app.use(
  cors({
    origin: true, // Dynamically reflect the request's origin
    credentials: true,
  })
);


// const allowedOrigins = [
//   "http://localhost:5173", 
//   "https://admin-dashboard-gamma-seven-21.vercel.app", 
//   "https://admin-dashboard-shits-projects-6347ef7e.vercel.app",
//   "https://admin-dashboard-git-main-shits-projects-6347ef7e.vercel.app"
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Allow credentials (cookies)
//   })
// );


app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/announcements', announcementRoutes);

// Error handling
// app.use(errorHandler);

module.exports = app;
