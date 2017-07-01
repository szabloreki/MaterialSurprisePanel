const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

describe('LOGIN', () => {
  let random = Math.random().toString(36).substring(7);

  it('db must send error if account with this email does not exist', (done) => {
    chai.request(server)
      .post('/api/login')
      .send(
        {
          "email":"1234567890@o31p.pl",
          "password":"robert123"
        }
      )
      .end((err,res) => {
        res.should.have.status(400);
        // res.should.be.json;
        // res.body.notExist.should.equal("Account with this email does not exist!");
        done();
      });
  });

  it('db must send error if email or password is invalid', (done) => {
    chai.request(server)
      .post('/api/login')
      .send(
        {
          "email":"asd123@asd123.com",
          "password": random
        }
      )
      .end((err,res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.notExist.should.equal("Account with this email does not exist!");
        done();
      });
  });

  it('db must log if email and password for guardian is valid', (done) => {
    chai.request(server)
      .post('/api/login ')
      .send(
        {
          "email": "guardian@gmail.com",
          "password": "guardian123"
        }
      )
      .end((err,res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.text.should.equal("Zalogowano pomyślnie jako opiekun");
        done();
      });
  });

  it('db must log if email and password for client is valid', (done) => {
    chai.request(server)
      .post('/api/login')
      .send(
        {
          "email": "client123@gmail.com",
          "password": "client"
        }
      )
      .end((err,res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.text.should.equal("Zalogowano pomyślnie jako klient");
        done();
      });
  });
});


describe("FORGOT", () => {
  it('db must tell if email does not exist', (done) => {
    chai.request(server)
      .post('/api/login/forgot')
      .send(
        {
          "email":"guardiandsa@gmail.com"
        }
      )
      .end((err,res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.errors.should.equal("User with specific email does not exist");
        done();
      });
  });

  it ('must send Edited if everything is allright',(done) => {
    chai.request(server)
      .post('/api/login/forgot')
      .send(
        {
          "email":"guardian@gmail.com"
        }
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.info.should.equal("Check Your MailBox");
        done();
      });
  });
});

describe("CHANGE", () => {
  let idGuardian
  beforeEach((done) => {
    chai.request(server)
      .post('/api/guardians')
      .send(
        {
          "password":"pass",
          "email":Math.random().toString(36).substring(7) + "@icloud.com",
          "name":"Robert",
          "surname":"Mrowiec",
          "telephone":"+48503786255"
        }
      )
      .end((err,res) => {
        res.body.guardian.should.have.property('_id');
        idGuardian = res.body.guardian._id;
        done();
      });
  });

  it ("must send error if recoveryKey expired", (done) => {
    chai.request(server)
      .post('/api/login/change/rujiut3gh786387463718iujhrefds89471y')
      .send(
        {
          "password":"asdqwe123"
        }
      )
      .end((err,res) => {
        res.body.should.be.json;
        res.body.should.have.status(400);
        // res.body.error.should.equal("Invalid recoveryKey, maybe You have done it before ?");
        done();
      });
  });
});
