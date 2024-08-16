const express = require('express');
const router = express.Router();
const UserRepository = require('../repositories/userRepository');
const UserDto = require('../dao/dto/userDto');

router.get('/current', async (req, res) => {
    try {
        const userRepository = new UserRepository();
        const user = await userRepository.getUserById(req.user.id);
        const userDto = new UserDto(user);  // Transformar el usuario a DTO

        res.json(userDto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

module.exports = router;
