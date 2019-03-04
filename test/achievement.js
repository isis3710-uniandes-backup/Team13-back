let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET achievement', () => {
      it('it should GET all the achievements', (done) => {
            chai.request(server)
            .get('/api/achievements')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST achievement', () => {
      it('it should POST an achievement ', (done) => {
          let achievement = {
            id: 1,
            name: "OK!",
            description: "This is the first achievement",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            isReward: false
          }
          chai.request(server)
          .post('/api/achievements')
          .send(achievement)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id achievement', () => {
      it('it should GET an achievement by the given id', (done) => {
          let achievement = { 
            id: 1,
            name: "YEAH!",
            description: "This is the first achievement",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            isReward: false 
          };
          chai.request(server)
          .get('/api/achievements/' + achievement.id)
          .send(achievement)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('logoURL');
            res.body.should.have.property('isReward');
            done();
          });
      });
  });
  describe('/PUT/:id achievement', () => {
      it('it should UPDATE an achievement given the id', (done) => {
          let achievement = { 
            id: 2,
            name: "YEAH!",
            description: "This is the first achievement",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            isReward: false 
          };
          chai.request(server)
          .put('/api/achievements/' + achievement.id)
          .send(achievement)
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
  describe('/DELETE/:id achievement', () => {
      it('it should DELETE an achievement given the id', (done) => {
          let achievement = { 
            id: 1,
            name: "YEAH!",
            description: "This is the first achievement",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            isReward: false 
          };
          chai.request(server)
          .delete('/api/achievements/' + achievement.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });