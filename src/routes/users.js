const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger'); // Importar el logger


// Registrar usuario
router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            logger.warning('Intento de registro sin email o password');
            throw new Error('Faltan datos requeridos');
        }
        logger.info(`Usuario registrado con éxito: ${email}`);
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
        logger.error('Error en el registro del usuario', err);
        next(err); // Enviar al middleware de errores
    }
});

// Login de usuario
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            if (bcrypt.compareSync(password, user.password)) {
                const payload = { id: user.id, email: user.email, role: user.role };
                const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

                res.cookie('jwt', token, { httpOnly: true });
                return res.json({ message: 'Login exitoso', token });
            } else {
                return res.status(400).json({ error: 'Contraseña incorrecta' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
