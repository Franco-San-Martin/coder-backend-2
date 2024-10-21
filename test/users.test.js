const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app'); // Asegúrate de que la ruta sea la correcta
const expect = chai.expect;

chai.use(chaiHttp);

describe('Users API', () => {

    // Test para crear un nuevo usuario
    it('should create a new user', (done) => {
        chai.request(server)
            .post('/api/users')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@example.com',
                age: 30,
                password: 'password123'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('email', 'john@example.com');
                done();
            });
    });

    // Test para obtener un usuario por ID
    it('should get a user by ID', (done) => {
        const userId = '123456'; // Coloca aquí un ID de usuario válido
        chai.request(server)
            .get(`/api/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id', userId);
                done();
            });
    });

    // Test para actualizar un usuario
    it('should update a user', (done) => {
        const userId = '123456'; // Coloca aquí un ID de usuario válido
        chai.request(server)
            .put(`/api/users/${userId}`)
            .send({
                first_name: 'Jane',
                age: 25
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('first_name', 'Jane');
                done();
            });
    });

    // Test para eliminar un usuario
    it('should delete a user', (done) => {
        const userId = '123456'; // Coloca aquí un ID de usuario válido
        chai.request(server)
            .delete(`/api/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'User deleted');
                done();
            });
    });
});