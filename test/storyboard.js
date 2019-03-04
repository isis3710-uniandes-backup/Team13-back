let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET storyboard', () => {
      it('it should GET all the storyboards', (done) => {
            chai.request(server)
            .get('/api/storyboards')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST storyboard', () => {
      it('it should POST a storyboard ', (done) => {
          let storyboard = {
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            title: "Some Title"
          }
          chai.request(server)
          .post('/api/storyboards')
          .send(storyboard)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id storyboard', () => {
      it('it should GET a storyboard by the given id', (done) => {
          let storyboard = { 
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            title: "Some Title" 
          };
          chai.request(server)
          .get('/api/storyboards/' + storyboard.id)
          .send(storyboard)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('timestamp');
            res.body.should.have.property('title');
            done();
          });
      });
  });
  describe('/PUT/:id storyboard', () => {
      it('it should UPDATE a storyboard given the id', (done) => {
          let storyboard = { 
            id: 2,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            title: "Some Title" 
          };
          chai.request(server)
          .put('/api/storyboards/' + storyboard.id)
          .send(storyboard)
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
  describe('/DELETE/:id storyboard', () => {
      it('it should DELETE a storyboard given the id', (done) => {
          let storyboard = { 
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            title: "Some Title" 
          };
          chai.request(server)
          .delete('/api/storyboards/' + storyboard.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });