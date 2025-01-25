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
app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your client domain
      credentials: true, // Allow credentials (cookies)
    })
  );
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/announcements', announcementRoutes);

// Error handling
// app.use(errorHandler);

module.exports = app;
