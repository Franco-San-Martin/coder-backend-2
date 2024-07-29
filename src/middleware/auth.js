const jwt = require('jsonwebtoken');
const User = require('../models/User');

const extractToken = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.jwt;
    }
    return token;
};

const current = (req, res, next) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token no válido' });
        }

        User.findById(decoded.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                req.user = user;
                next();
            })
            .catch(err => res.status(500).json({ error: err.message }));
    });
};

module.exports = current;