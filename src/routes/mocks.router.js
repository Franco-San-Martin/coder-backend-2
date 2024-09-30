const { Router } = require('express');
const { generateMockingPets, generateMockingUsers } = require('../utils/mockingUtils');
const Pet = require('../dao/models/productDao'); 
const User = require('../dao/models/userDao'); 
const router = Router();

// Endpoint para generar mascotas falsas (mockingpets)
router.get('/mockingpets', (req, res) => {
    const pets = generateMockingPets();
    res.status(200).json({ message: 'Mascotas generadas exitosamente', pets });
});

// Endpoint para generar usuarios falsos (mockingusers)
router.get('/mockingusers', (req, res) => {
    const users = generateMockingUsers();
    res.status(200).json({ message: 'Usuarios generados exitosamente', users });
});

// Endpoint para generar y almacenar usuarios y mascotas en la base de datos
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body; // Obtener la cantidad de usuarios y mascotas a generar
    const usersToInsert = generateMockingUsers(users);
    const petsToInsert = generateMockingPets(pets);

    try {
        await User.insertMany(usersToInsert); // Insertar los usuarios generados en la base de datos
        await Pet.insertMany(petsToInsert); // Insertar las mascotas generadas en la base de datos
        res.status(200).json({ message: 'Usuarios y mascotas insertados exitosamente en la base de datos' });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar los datos en la base de datos', details: error });
    }
});

module.exports = router;