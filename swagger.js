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
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
        },
      },
    },
    //  apply cookieAuth globally to all routes 
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
