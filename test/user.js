let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/api/users')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST user', () => {
      it('it should POST a user ', (done) => {
          let user = {
            id: 1,
            nickname: "Some nickname",
            fullname: "Some fullname",
            score: 1000,
            level: 3,
            isloggedin: false
          }
          chai.request(server)
          .post('/api/users')
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
          let user = { 
            id: 1,
            nickname: "Some nickname",
            fullname: "Some fullname",
            score: 1000,
            level: 3,
            isloggedin: false 
          };
          chai.request(server)
          .get('/api/users/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('nickname');
            res.body.should.have.property('fullname');
            res.body.should.have.property('score');
            res.body.should.have.property('level');
            res.body.should.have.property('isloggedin');
            done();
          });
      });
  });
  describe('/PUT/:id user', () => {
      it('it should UPDATE a user given the id', (done) => {
          let user = { 
            id: 2,
            nickname: "Some new nickname",
            fullname: "Some new fullname",
            score: 7000,
            level: 5,
            isloggedin: false 
          };
          chai.request(server)
          .put('/api/users/' + user.id)
          .send(user)
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
  describe('/DELETE/:id user', () => {
      it('it should DELETE a user given the id', (done) => {
          let user = { 
            id: 1,
            nickname: "Some nickname",
            fullname: "Some fullname",
            score: 1000,
            level: 3,
            isloggedin: false 
          };
          chai.request(server)
          .delete('/api/users/' + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });