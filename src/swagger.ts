import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'eblog-api',
    version: '1.0.0',
    description: 'API for headless CMS',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./router.ts'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;