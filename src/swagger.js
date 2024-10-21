const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API del proyecto principal',
        },
    },
    apis: ['./src/routes/*.js'], // Aquí se leerán las anotaciones de JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware de Swagger para mostrar la documentación en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;