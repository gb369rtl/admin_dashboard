const app = require('./app');
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 8081;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
