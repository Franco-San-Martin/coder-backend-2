const errorDictionary = {
    VALIDATION_ERROR: 'Error de validación',
    USER_NOT_FOUND: 'Usuario no encontrado',
    PET_NOT_FOUND: 'Mascota no encontrada',
    DATABASE_ERROR: 'Error en la base de datos',
    UNAUTHORIZED: 'No autorizado',
};

class CustomError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

const errorHandler = (err, req, res, next) => {
    const { code } = err;
    const message = errorDictionary[code] || 'Error desconocido';
    res.status(500).json({ error: message });
};

module.exports = {
    CustomError,
    errorHandler,
};