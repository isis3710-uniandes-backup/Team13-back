let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

  describe('/GET gametype', () => {
      it('it should GET all the gametypes', (done) => {
            chai.request(server)
            .get('/api/gametypes')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
            });
      });
  });
  describe('/POST gametype', () => {
      it('it should POST a gametype ', (done) => {
          let gametype = {
            id: 1,
            name: "Some name",
            description: "Some description",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timelimit: 20
          }
          chai.request(server)
          .post('/api/gametypes')
          .send(gametype)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('content');
            done();
          });
      });
  });
  describe('/GET/:id gametype', () => {
      it('it should GET a gametype by the given id', (done) => {
          let gametype = { 
            id: 1,
            name: "Some name",
            description: "Some description",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timelimit: 20 
          };
          chai.request(server)
          .get('/api/gametypes/' + gametype.id)
          .send(gametype)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('logoURL');
            res.body.should.have.property('timelimit');
            done();
          });
      });
  });
  describe('/PUT/:id gametype', () => {
      it('it should UPDATE a gametype given the id', (done) => {
          let gametype = { 
            id: 2,
            name: "Some new name",
            description: "Some new description",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timelimit: 20 
          };
          chai.request(server)
          .put('/api/gametypes/' + gametype.id)
          .send(gametype)
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
  describe('/DELETE/:id gametype', () => {
      it('it should DELETE a gametype given the id', (done) => {
          let gametype = { 
            id: 1,
            name: "Some name",
            description: "Some description",
            logoURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timelimit: 20 
          };
          chai.request(server)
          .delete('/api/gametypes/' + gametype.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
  });