const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Client CRM API',
      version: '1.0.0',
      description: 'API for managing client contacts in a CRM system',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Local development server',
      },
      {
        url: 'https://client-crm-api.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust if your route files are elsewhere
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
