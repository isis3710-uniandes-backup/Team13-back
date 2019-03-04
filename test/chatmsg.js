let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET chatmsg', () => {
      it('it should GET all the chatmsgs', (done) => {
            chai.request(server)
            .get('/api/chatmsgs')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST chatmsg', () => {
      it('it should POST a chatmsg ', (done) => {
          let chatmsg = {
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text"
          }
          chai.request(server)
          .post('/api/chatmsgs')
          .send(chatmsg)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id chatmsg', () => {
      it('it should GET a chatmsg by the given id', (done) => {
          let chatmsg = { 
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .get('/api/chatmsgs/' + chatmsg.id)
          .send(chatmsg)
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
  describe('/PUT/:id chatmsg', () => {
      it('it should UPDATE a chatmsg given the id', (done) => {
          let chatmsg = { 
            id: 2,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .put('/api/chatmsgs/' + chatmsg.id)
          .send(chatmsg)
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
  describe('/DELETE/:id chatmsg', () => {
      it('it should DELETE a chatmsg given the id', (done) => {
          let chatmsg = { 
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text"
          };
          chai.request(server)
          .delete('/api/chatmsgs/' + chatmsg.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });