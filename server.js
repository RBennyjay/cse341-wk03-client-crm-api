const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Load environment variables
dotenv.config();

// Passport config
require('./auth/passport');

// Route imports
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');
const appointmentRoutes = require('./routes/appointments');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const port = process.env.PORT || 8080;

// Security & Parsing Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Session Configuration
app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Client CRM API. Visit /api-docs for Swagger docs.');
});

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/dashboard', dashboardRoutes); 

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
