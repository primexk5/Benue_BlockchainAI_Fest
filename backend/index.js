require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(helmet());
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy.' });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});


app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(500).json({ success: false, message: 'An unexpected error occurred.' });
});


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('[DB] MySQL connection established successfully.');

    app.listen(PORT, () => {
      console.log(`[Server] Running on http://localhost:${PORT}`);
      console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('[DB] Unable to connect to MySQL database:', err.message);
    console.error('[DB] Ensure MySQL is running and config/config.json credentials are correct.');
    process.exit(1);
  }
}

startServer();