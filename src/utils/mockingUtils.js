const faker = require('faker');
const bcrypt = require('bcrypt');

// Función para generar mascotas falsas
const generateMockingPets = (count = 100) => {
    const pets = [];
    for (let i = 0; i < count; i++) {
        pets.push({
            name: faker.name.firstName(),
            type: faker.animal.type(),
            adopted: false,
        });
    }
    return pets;
};

// Función para generar usuarios falsos
const generateMockingUsers = (count = 50) => {
    const users = [];
    const roles = ['user', 'admin'];

    for (let i = 0; i < count; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        const hashedPassword = bcrypt.hashSync('coder123', 10); // Contraseña encriptada "coder123"

        users.push({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role,
            pets: [],
        });
    }
    return users;
};

module.exports = {
    generateMockingPets,
    generateMockingUsers,
};