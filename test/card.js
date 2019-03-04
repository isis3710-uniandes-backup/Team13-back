let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET card', () => {
      it('it should GET all the cards', (done) => {
            chai.request(server)
            .get('/api/cards')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST card', () => {
      it('it should POST a card ', (done) => {
          let card = {
            id: 1,
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text"
          }
          chai.request(server)
          .post('/api/cards')
          .send(card)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id card', () => {
      it('it should GET a card by the given id', (done) => {
          let card = { 
            id: 1,
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .get('/api/cards/' + card.id)
          .send(card)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('imageURL');
            res.body.should.have.property('timestamp');
            res.body.should.have.property('text');
            done();
          });
      });
  });
  describe('/PUT/:id card', () => {
      it('it should UPDATE a card given the id', (done) => {
          let card = { 
            id: 2,
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .put('/api/cards/' + card.id)
          .send(card)
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
  describe('/DELETE/:id card', () => {
      it('it should DELETE a card given the id', (done) => {
          let card = { 
            id: 1,
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some Text" 
          };
          chai.request(server)
          .delete('/api/cards/' + card.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });