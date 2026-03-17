require('dotenv').config();

const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const hackathonRoutes = require('./routes/hackathonRoutes');
const productShowcaseRoutes = require('./routes/productShowcaseRoutes');
const speakerApplicationRoutes = require('./routes/speakerApplicationRoutes');

const { globalLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;


const defaultOrigins = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'https://www.benueblockchainfest.com', 
  'https://benueblockchainfest.com'
];

const envOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : [];

const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

const corsOptions = {
  origin: function (origin, callback) {
    // If there's no origin (e.g. server-to-server or Postman) or it's in our list, allow it
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Blocked origin -> ${origin}`);
      // Returning an error instead of false makes express-cors block the request completely
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// GLOBAL SECURITY MIDDLEWARE
app.use(helmet());
app.use(cors(corsOptions));
app.use(globalLimiter);

// REQUEST PARSING WITH SIZE LIMITS (PROTECTION AGAINST LARGE PAYLOAD ATTACKS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/product-showcase', productShowcaseRoutes);
app.use('/api/speaker-application', speakerApplicationRoutes);


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
    console.log('[DB] PostgreSQL (Supabase) connection established successfully.');

    app.listen(PORT, () => {
      console.log(`[Server] Running on http://localhost:${PORT}`);
      console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('[DB] Unable to connect to PostgreSQL database:', err.message);
    console.error('[DB] Ensure DATABASE_URL is configured properly.');
    process.exit(1);
  }
}

startServer();