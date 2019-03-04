let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET chat', () => {
      it('it should GET all the chats', (done) => {
            chai.request(server)
            .get('/api/chats')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST chat', () => {
      it('it should POST a chat ', (done) => {
          let chat = {
            id: 1,
            name: "Some name",
            capacity: 10
          }
          chai.request(server)
          .post('/api/chats')
          .send(chat)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id chat', () => {
      it('it should GET a chat by the given id', (done) => {
          let chat = { 
            id: 1,
            name: "Some name",
            capacity: 10 
          };
          chai.request(server)
          .get('/api/chats/' + chat.id)
          .send(chat)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('capacity');
            done();
          });
      });
  });
  describe('/PUT/:id chat', () => {
      it('it should UPDATE a chat given the id', (done) => {
          let chat = { 
            id: 2,
            name: "Some new name",
            capacity: 10 
          };
          chai.request(server)
          .put('/api/chats/' + chat.id)
          .send(chat)
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
  describe('/DELETE/:id chat', () => {
      it('it should DELETE a chat given the id', (done) => {
          let chat = { 
            id: 1,
            name: "Some name",
            capacity: 10 
          };
          chai.request(server)
          .delete('/api/chats/' + chat.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });