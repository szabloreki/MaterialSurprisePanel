const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const crypto = require('crypto');

chai.use(chaiHttp);

describe('Tasks GET', () => {

  it("Must send table with Tasks", (done) => {
    chai.request(server)
      .get('/api/Tasks')
      .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
      });
  });
})

describe('Tasks GET INFO', () => {
  let idTasks;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/tasks')
      .send(
        {
          "title": "String",
          "description": "String",
          "projectId": "String",
          "responsible": "String",
          "status": true,
          "categoryId": "String",
          "hidden": false,
          "priority": 3,
          "endDate": "2015-04-12"
        }
      )
      .end((err,res) => {

        res.should.have.status(200);
        res.should.be.json;
        res.body.task.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie task");
        idTasks = res.body.task._id;
        done();
      });
    });

    it('if Tasks does not exist, return status 400', (done) => {
      chai.request(server)
        .get('/api/Tasks/58cdbe1ec88b143e9d0a910f')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorFind.should.equal("Nie znaleziono taska z takim ID");
          done();
        });
    });

    it ('if task exist, show details about it', (done) => {
      chai.request(server)
        .get('/api/tasks/'+ idTasks)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('title');
          done();
        })
    });
  });


describe('Tasks POST', () => {

    it('should add Tasks', (done) => {
    chai.request(server)
    .post('/api/tasks')
    .send(
      {
        "title": "String",
        "description": "String",
        "projectId": "String",
        "responsible": "String",
        "status": true,
        "categoryId": "String",
        "hidden": false,
        "priority": 3,
        "endDate": "2015-04-12"
      }
    )
    .end((err,res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.task.should.have.property('_id');
      res.body.information.should.equal("Dodano pomyślnie task");
      done();
    });
  });
})

  describe('Tasks DELETE', () => {

    let idTasks;
    beforeEach((done) => {
      chai.request(server)
        .post('/api/tasks')
        .send(
          {
           "title": "String",
            "description": "String",
            "projectId": "String",
            "responsible": "String",
            "status": true,
            "categoryId": "String",
            "hidden": false,
            "priority": 3,
            "endDate": "2015-04-12"
          }
        )
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.task.should.have.property('_id');
          res.body.information.should.equal("Dodano pomyślnie task");
          idTasks = res.body.task._id;
          done()
        })
    })

    it ('if task exist , return status 200 and remove it',(done) => {
      chai.request(server)
        .delete('/api/tasks/'+ idTasks)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.info.should.equal("Usunięto taska");
          done();
        })
    });

    it('if task does not exist, return status 400', (done) => {
      chai.request(server)
        .delete('/api/tasks/589a14f6f097940898a8d0e2')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.equal("Task z takim ID nie istnieje!")
          done();
        });
    });
  });


describe('Tasks UPDATE', () => {

  let idTasks;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/tasks')
      .send(
        {
          "title": "String",
           "description": "String",
           "projectId": "String",
           "responsible": "String",
           "status": true,
           "categoryId": "String",
           "hidden": false,
           "priority": 3,
           "endDate": "2015-04-12"
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.task.should.have.property('_id');
        res.body.information.should.equal("Dodano pomyślnie task");
        idTasks = res.body.task._id;
        done()
      })
  })

    it('should edit task', (done) => {
      chai.request(server)
        .put('/api/tasks/' + idTasks )
        .send(
          {
            "title": "String",
             "description": "String",
             "projectId": "String",
             "responsible": "String",
             "status": true,
             "categoryId": "String",
             "hidden": false,
             "priority": 3,
             "endDate": "2015-04-12"
          }
        )
        .end((req,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.information.should.equal("Zaktualizowano");
          done();
        })
    });

    it('should get error when task does not exist', (done) => {
      chai.request(server)
        .put('/api/tasks/589a14f6f097940898a8d0e2')
        .send(
          {
            "title": "String",
             "description": "String",
             "projectId": "String",
             "responsible": "String",
             "status": true,
             "categoryId": "String",
             "hidden": false,
             "priority": 3,
             "endDate": "2015-04-12"
          }
        )
        .end((req,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorID.should.equal("Task z takim ID nie istnieje!")
          done();
        });
    });
});
