const { Router } = require('express');
const logger = require('../utils/logger'); // Importar el logger

const router = Router();

// Endpoint para probar los logs
router.get('/loggerTest', (req, res) => {
    logger.debug('Este es un log de nivel debug');
    logger.http('Este es un log de nivel http');
    logger.info('Este es un log de nivel info');
    logger.warning('Este es un log de nivel warning');
    logger.error('Este es un log de nivel error');
    logger.fatal('Este es un log de nivel fatal');

    res.send('Logs probados. Revisa la consola y el archivo errors.log.');
});

module.exports = router;