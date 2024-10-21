const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Sessions API', () => {

    // Test de registro
    it('should register a new user', (done) => {
        chai.request(server)
            .post('/api/sessions/register')
            .send({
                first_name: 'Jane',
                last_name: 'Doe',
                email: 'jane@example.com',
                password: 'password123',
                age: 25
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('email', 'jane@example.com');
                done();
            });
    });

    // Test de login
    it('should login an existing user', (done) => {
        chai.request(server)
            .post('/api/sessions/login')
            .send({
                email: 'jane@example.com',
                password: 'password123'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message', 'Logged in successfully');
                done();
            });
    });
});