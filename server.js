const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const contactRoutes = require('./routes/contacts');
const appointmentRoutes = require('./routes/appointments');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Client CRM API. Visit /api-docs for Swagger docs.');
});

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/contacts', contactRoutes);
app.use('/appointments', appointmentRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// DB Connection and Server Start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () =>
      console.log(`✅ Server running on port ${port}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
