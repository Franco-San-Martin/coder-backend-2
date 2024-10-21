const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Users Documentation',
            version: '1.0.0',
            description: 'API Documentation for the Users module',
        },
    },
    apis: ['./routes/userRouter.js'], // Aquí puedes incluir más rutas si es necesario
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;