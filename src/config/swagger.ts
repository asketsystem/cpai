export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contextually Personal AI API',
      version: '1.0.0',
      description: 'Human-Centered Intelligence for Africa\'s Future',
      contact: {
        name: 'Klingbo Intelligence',
        url: 'https://klingbo.ai',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/routes/*.ts', './src/api/controllers/*.ts'],
}; 