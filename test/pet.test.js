const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app'); // Asegúrate de que la ruta sea la correcta
const expect = chai.expect;

chai.use(chaiHttp);

describe('Pets API', () => {

    // Test para crear una nueva mascota
    it('should create a new pet', (done) => {
        chai.request(server)
            .post('/api/pets')
            .send({
                name: 'Bobby',
                type: 'Dog',
                age: 3
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Bobby');
                done();
            });
    });

    // Test para obtener todas las mascotas
    it('should get all pets', (done) => {
        chai.request(server)
            .get('/api/pets')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    // Test para obtener una mascota por ID
    it('should get a pet by ID', (done) => {
        const petId = '654321'; // Coloca aquí un ID de mascota válido
        chai.request(server)
            .get(`/api/pets/${petId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', petId);
                done();
            });
    });

    // Test para actualizar una mascota
    it('should update a pet', (done) => {
        const petId = '654321'; // Coloca aquí un ID de mascota válido
        chai.request(server)
            .put(`/api/pets/${petId}`)
            .send({
                name: 'Max',
                age: 4
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Max');
                done();
            });
    });

    // Test para eliminar una mascota
    it('should delete a pet', (done) => {
        const petId = '654321'; // Coloca aquí un ID de mascota válido
        chai.request(server)
            .delete(`/api/pets/${petId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Pet deleted');
                done();
            });
    });
});