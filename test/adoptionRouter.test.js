const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Adoptions API', () => {
    it('should retrieve all adoptions', (done) => {
        chai.request(server)
            .get('/api/adoptions')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create a new adoption', (done) => {
        chai.request(server)
            .post('/api/adoptions')
            .send({
                petId: 'somePetId',
                userId: 'someUserId',
                adoptionDate: new Date(),
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('petId');
                done();
            });
    });
});