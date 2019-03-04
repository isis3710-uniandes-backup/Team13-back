let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET comment', () => {
      it('it should GET all the comments', (done) => {
            chai.request(server)
            .get('/api/comments')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST comment', () => {
      it('it should POST a comment ', (done) => {
          let comment = {
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text"
          }
          chai.request(server)
          .post('/api/comments')
          .send(comment)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id comment', () => {
      it('it should GET a comment by the given id', (done) => {
          let comment = { 
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .get('/api/comments/' + comment.id)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('timestamp');
            res.body.should.have.property('text');
            done();
          });
      });
  });
  describe('/PUT/:id comment', () => {
      it('it should UPDATE a comment given the id', (done) => {
          let comment = { 
            id: 2,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some new Text" 
          };
          chai.request(server)
          .put('/api/comments/' + comment.id)
          .send(comment)
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
  describe('/DELETE/:id comment', () => {
      it('it should DELETE a comment given the id', (done) => {
          let comment = { 
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .delete('/api/comments/' + comment.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });