const winston = require('winston');

// Niveles de logging: debug, http, info, warning, error, fatal (de menor a mayor)
const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

// Formato personalizado para los logs
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

// Transporte para guardar logs en un archivo (a partir de nivel "error")
const errorFileTransport = new winston.transports.File({
    filename: 'errors.log',
    level: 'error',
});

// Logger para desarrollo (loggea desde nivel "debug")
const developmentLogger = winston.createLogger({
    levels,
    format,
    transports: [
        new winston.transports.Console({ level: 'debug' }), // Loggea en consola desde debug
    ],
});

// Logger para producción (loggea desde nivel "info" y guarda errores en archivo)
const productionLogger = winston.createLogger({
    levels,
    format,
    transports: [
        new winston.transports.Console({ level: 'info' }), // Loggea en consola desde info
        errorFileTransport, // Guarda errores en archivo
    ],
});

// Seleccionamos el logger en función del entorno
const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

module.exports = logger;