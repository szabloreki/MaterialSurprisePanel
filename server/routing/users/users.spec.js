const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const crypto = require('crypto');

chai.use(chaiHttp);

describe('Users GET', () => {

  it("Must send table with users", (done) => {
    chai.request(server)
      .get('/api/users')
      .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
      });
  });
})

describe('User GET INFO', () => {
  let idUser;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/users')
      .send(
        {
          "name":"name",
          "showName":"showName",
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.User.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie użytkownika");
        idUser = res.body.User._id;
        done();
      });
    });

    it('if user does not exist, return status 400', (done) => {
      chai.request(server)
        .get('/api/users/58cdbe1ec88b143e9d0a910f')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorFind.should.equal("Nie znaleziono użytkownika z takim ID");
          done();
        });
    });
    it ('if user exist, show details about it', (done) => {
      chai.request(server)
        .get('/api/users/'+ idUser)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('name');
          done();
        })
    });
  });
describe('User POST', () => {
    it('should add user', (done) => {
    chai.request(server)
    .post('/api/users')
    .send(
      {
        "name":"name",
        "showName":"showName",
      }
    )
    .end((err,res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.User.should.have.property('_id');
      res.body.information.should.equal("Dodano pomyślnie użytkownika");
      done();
    });
  });
})

  describe('User DELETE', () => {

    let idUser;
    beforeEach((done) => {
      chai.request(server)
        .post('/api/users')
        .send(
          {
            "name":"name",
            "showName":"showName",
          }
        )
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.User.should.have.property('_id');
          res.body.information.should.equal("Dodano pomyślnie użytkownika");
          idUser = res.body.User._id;
          done()
        })
    })

    it ('if user exist , return status 200 and remove it',(done) => {
      chai.request(server)
        .delete('/api/users/'+ idUser)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.info.should.equal("Usunięto użytkownika");
          done();
        })
    });

    it('if user does not exist, return status 400', (done) => {
      chai.request(server)
        .delete('/api/users/589a14f6f097940898a8d0e2')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.equal("Użytkownik z takim ID nie istnieje!")
          done();
        });
    });
  });


describe('User UPDATE', () => {

  let idUser;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/users')
      .send(
        {
          "email":"nam@eer.pl",
          "password":"showName",
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.User.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie użytkownika");
        idUser = res.body.User._id;
        done()
      })
  })

    it('should edit user', (done) => {
      chai.request(server)
        .put('/api/users/' + idUser )
        .send(
          {
            "name":"name",
            "showName":"showName",
          }
        )
        .end((req,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.information.should.equal("Zaktualizowano");
          done();
        })
    });

    it('should get error when user does not exist', (done) => {
      chai.request(server)
        .put('/api/users/589a14f6f097940898a8d0e2')
        .send(
          {
            "name":"name",
            "showName":"showName"
          }
        )
        .end((req,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorID.should.equal("Użytkownik z takim ID nie istnieje")
          done();
        });
    });
});
