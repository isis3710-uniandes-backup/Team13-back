let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET game', () => {
      it('it should GET all the games', (done) => {
            chai.request(server)
            .get('/api/games')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST game', () => {
      it('it should POST a game ', (done) => {
          let game = {
            id: 1,
            timestampinit: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            timestampend: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            isActive: false
          }
          chai.request(server)
          .post('/api/games')
          .send(game)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id game', () => {
      it('it should GET a game by the given id', (done) => {
          let game = { 
            id: 1,
            timestampinit: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            timestampend: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            isActive: false 
          };
          chai.request(server)
          .get('/api/games/' + game.id)
          .send(game)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('timestampinit');
            res.body.should.have.property('timestampend');
            res.body.should.have.property('isActive');
            done();
          });
      });
  });
  describe('/PUT/:id game', () => {
      it('it should UPDATE a game given the id', (done) => {
          let game = { 
            id: 2,
            timestampinit: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            timestampend: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            isActive: false 
          };
          chai.request(server)
          .put('/api/games/' + game.id)
          .send(game)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id game', () => {
      it('it should DELETE a game given the id', (done) => {
          let game = { 
            id: 1,
            timestampinit: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            timestampend: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            isActive: false 
          };
          chai.request(server)
          .delete('/api/games/' + game.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });