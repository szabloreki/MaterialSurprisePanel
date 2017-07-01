const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const crypto = require('crypto');

chai.use(chaiHttp);

describe('Clients GET', () => {

  it("Must send table with clients", (done) => {
    chai.request(server)
      .get('/api/clients')
      .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
      });
  });
})

describe('Client GET INFO', () => {
  let idClient;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/clients')
      .send(
        {
          "name":"name",
          "details":"details",
          "responsible":5,
          "key":1
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.Client.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie klienta");
        idClient = res.body.Client._id;
        done();
      });
    });

    it('if client does not exist, return status 400', (done) => {
      chai.request(server)
        .get('/api/clients/58cdbe1ec88b143e9d0a910f')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorFind.should.equal("Nie znaleziono klienta z takim ID");
          done();
        });
    });
    it ('if client exist, show details about it', (done) => {
      chai.request(server)
        .get('/api/clients/'+ idClient)
        .end((err,res) => {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('name');
          done();
        })
    });
  });
describe('Client POST', () => {
    it('should add client', (done) => {
    chai.request(server)
    .post('/api/clients')
    .send(
      {
        "title":"title",
        "description":"description"
      }
    )
    .end((err,res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.Client.should.have.property('_id');
      res.body.information.should.equal("Dodano pomyślnie klienta");
      done();
    });
  });
})


  describe('Client DELETE', () => {

    let clientID;
    beforeEach((done) => {
      chai.request(server)
        .post('/api/clients')
        .send(
          {
            "name":"name",
            "details":"details",
            "responsible":5,
            "key":1
          }
        )
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.Client.should.have.property('_id');
          res.body.information.should.equal("Dodano pomyślnie klienta");
          clientID = res.body.Client._id;
          done()
        })
    })

    it ('if client exist , return status 200 and remove it',(done) => {
      chai.request(server)
        .delete('/api/clients/'+ clientID)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.equal("Usunięto klienta");
          done();
        })
    });

    it('if client does not exist, return status 400', (done) => {
      chai.request(server)
        .delete('/api/clients/589a14f6f097940898a8d0e2')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.equal("Klient z takim ID nie istnieje!")
          done();
        });
    });
  });


describe('Client UPDATE', () => {

  let clientID;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/clients')
      .send(
        {
          "name":"name",
          "details":"details",
          "responsible":5,
          "key":1
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.Client.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie klienta");
        clientID = res.body.Client._id;
        done()
      })
  })

    it('should edit client', (done) => {
      chai.request(server)
        .put('/api/clients/' + clientID )
        .send(
          {
            "name":"name",
            "details":"details",
            "responsible":5,
            "key":1
          }
        )
        .end((req,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.equal("Zaktualizowano");
          done();
        })
    });

    it('should get error when client does not exist', (done) => {
      chai.request(server)
        .put('/api/clients/589a14f6f097940898a8d0e2')
        .send(
          {
            "name":"name",
            "details":"details",
            "responsible":5,
            "key":1
          }
        )
        .end((req,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorID.should.equal("Klient z takim ID nie istnieje!")
          done();
        });
    });
});
