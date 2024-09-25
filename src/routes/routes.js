const { Router } = require('express');
const { generateMockPets } = require('../utils/mocking');
const router = Router();

// Endpoint para generar mascotas falsas
router.get('/mockingpets', (req, res) => {
    const mockPets = generateMockPets(100); // Generar 100 mascotas
    res.json({ pets: mockPets });
});

module.exports = router;