const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const crypto = require('crypto');

chai.use(chaiHttp);

describe('Projects GET', () => {

  it("Must send table with projects", (done) => {
    chai.request(server)
      .get('/api/projects')
      .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
      });
  });
})

describe('Project GET INFO', () => {
  let idProject;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/projects')
      .send(
        {
          "name": "String",
          "client": "String",
          "status": "String",
          "details": "String",
          "key": 3,
          "finances": {
            "all": 0,
            "frontEnd": 1,
            "backEnd": 2,
            "hosting": 3,
            "graphic": 4,
            "frontEndAdmin": 5,
            "frontEndHtml": 6
          },
          "brief": [
            {
              "name": "String",
              "description": "String"
            }
          ],
          "contacts": [
            {
              "title": "String",
              "description": "String"
            }
          ]
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.Project.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie projekt");
        idProject = res.body.Project._id;
        done();
      });
    });

    it('if project does not exist, return status 400', (done) => {
      chai.request(server)
        .get('/api/projects/58cdbe1ec88b143e9d0a910f')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorFind.should.equal("Nie znaleziono projektu z takim ID");
          done();
        });
    });

    it ('if project exist, show details about it', (done) => {
      chai.request(server)
        .get('/api/projects/'+ idProject)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('name');
          done();
        })
    });
  });


describe('Project POST', () => {

    it('should add project', (done) => {
    chai.request(server)
    .post('/api/projects')
    .send(
      {
        "name": "String",
        "client": "String",
        "status": "String",
        "details": "String",
        "key": 3,
        "finances": {
          "all": 0,
          "frontEnd": 1,
          "backEnd": 2,
          "hosting": 3,
          "graphic": 4,
          "frontEndAdmin": 5,
          "frontEndHtml": 6
        },
        "brief": [
          {
            "name": "String",
            "description": "String"
          }
        ],
        "contacts": [
          {
            "title": "String",
            "description": "String"
          }
        ]
      }
    )
    .end((err,res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.Project.should.have.property('_id');
      res.body.information.should.equal("Dodano pomyślnie projekt");
      done();
    });
  });
})

  describe('Project DELETE', () => {

    let idProject;
    beforeEach((done) => {
      chai.request(server)
        .post('/api/projects')
        .send(
          {
            "name": "String",
            "client": "String",
            "status": "String",
            "details": "String",
            "key": 3,
            "finances": {
              "all": 0,
              "frontEnd": 1,
              "backEnd": 2,
              "hosting": 3,
              "graphic": 4,
              "frontEndAdmin": 5,
              "frontEndHtml": 6
            },
            "brief": [
              {
                "name": "String",
                "description": "String"
              }
            ],
            "contacts": [
              {
                "title": "String",
                "description": "String"
              }
            ]
          }
        )
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.Project.should.have.property('_id');
          res.body.information.should.equal("Dodano pomyślnie projekt");
          idProject = res.body.Project._id;
          done()
        })
    })

    it ('if project exist , return status 200 and remove it',(done) => {
      chai.request(server)
        .delete('/api/projects/'+ idProject)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.info.should.equal("Usunięto projekt");
          done();
        })
    });

    it('if project does not exist, return status 400', (done) => {
      chai.request(server)
        .delete('/api/projects/589a14f6f097940898a8d0e2')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.equal("Projekt z takim ID nie istnieje!")
          done();
        });
    });
  });


describe('project UPDATE', () => {

  let idProject;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/projects')
      .send(
        {
          "name": "String",
          "client": "String",
          "status": "String",
          "details": "String",
          "key": 3,
          "finances": {
            "all": 0,
            "frontEnd": 1,
            "backEnd": 2,
            "hosting": 3,
            "graphic": 4,
            "frontEndAdmin": 5,
            "frontEndHtml": 6
          },
          "brief": [
            {
              "name": "String",
              "description": "String"
            }
          ],
          "contacts": [
            {
              "title": "String",
              "description": "String"
            }
          ]
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.Project.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie projekt");
        idProject = res.body.Project._id;
        done()
      })
  })

    it('should edit project', (done) => {
      chai.request(server)
        .put('/api/projects/' + idProject )
        .send(
          {
            "name": "String",
            "client": "String",
            "status": "String",
            "details": "String",
            "key": 3,
            "finances": {
              "all": 0,
              "frontEnd": 1,
              "backEnd": 2,
              "hosting": 3,
              "graphic": 4,
              "frontEndAdmin": 5,
              "frontEndHtml": 6
            },
            "brief": [
              {
                "name": "String",
                "description": "String"
              }
            ],
            "contacts": [
              {
                "title": "String",
                "description": "String"
              }
            ]
          }
        )
        .end((req,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        })
    });

    it('should get error when project does not exist', (done) => {
      chai.request(server)
        .put('/api/projects/589a14f6f097940898a8d0e2')
        .send(
          {
            "name": "String",
            "client": "String",
            "status": "String",
            "details": "String",
            "key": 3,
            "finances": {
              "all": 0,
              "frontEnd": 1,
              "backEnd": 2,
              "hosting": 3,
              "graphic": 4,
              "frontEndAdmin": 5,
              "frontEndHtml": 6
            },
            "brief": [
              {
                "name": "String",
                "description": "String"
              }
            ],
            "contacts": [
              {
                "title": "String",
                "description": "String"
              }
            ]
          }
        )
        .end((req,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorID.should.equal("Projekt z takim ID nie istnieje!")
          done();
        });
    });
});
