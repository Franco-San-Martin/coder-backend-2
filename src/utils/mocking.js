const { faker } = require('@faker-js/faker');

// Generar una mascota falsa
const generateFakePet = () => ({
    name: faker.animal.type(),
    breed: faker.animal.cat(),  // Puedes cambiar el tipo según tu necesidad
    age: faker.datatype.number({ min: 1, max: 15 }), // Edad entre 1 y 15 años
    adopted: false
});

// Generar varias mascotas
const generateMockPets = (num = 100) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        pets.push(generateFakePet());
    }
    return pets;
};

module.exports = { generateMockPets };