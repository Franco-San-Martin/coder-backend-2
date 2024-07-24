const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrar usuario
router.post('/register', (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const newUser = new User({ first_name, last_name, email, age, password });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: err.message }));
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
