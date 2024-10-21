const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger'); // Importar el logger
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const app = express();
const mocksRouter = require('./routes/mocks.router');
const swaggerApp = require('./swagger');
const swaggerDocs = require('./config/swaggerConfig');
const { errorHandler } = require('./middleware/errorHandler');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });


// Ejemplo de uso de logs en puntos importantes del servidor
app.get('/loggerTest', (req, res) => {
    logger.debug('Este es un log de nivel debug');
    logger.http('Este es un log de nivel http');
    logger.info('Este es un log de nivel info');
    logger.warning('Este es un log de nivel warning');
    logger.error('Este es un log de nivel error');
    logger.log('fatal', 'Este es un log de nivel fatal'); // O puedes usar logger.fatal directamente

    res.send('Logs probados. Revisa la consola y el archivo errors.log.');
});

// Manejar errores
app.use(errorHandler);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require('./config/passport')(passport);

// Rutas
app.use('/api/users', users);
app.use('/api/sessions', sessions);
const petsRouter = require('./routes/pets');
app.use('/api/pets', petsRouter);
app.use(errorHandler);

// Usar el router de mocks
app.use('/api/mocks', mocksRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));


app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3000}`);
});

// Usar Swagger para la documentación
app.use(swaggerApp);

swaggerDocs(app); // Llama a la función para servir la documentación