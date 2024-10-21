const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Actualizamos la propiedad last_connection
    user.last_connection = new Date();
    await user.save();

    res.cookie('token', token, { httpOnly: true });
    return res.json({ message: 'Logged in successfully' });
};

const logout = async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (user) {
            // Actualizamos last_connection en logout
            user.last_connection = new Date();
            await user.save();
        }
    }

    res.clearCookie('token');
    return res.json({ message: 'Logged out successfully' });
};

module.exports = { login, logout };