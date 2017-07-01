const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const crypto = require('crypto');

chai.use(chaiHttp);

describe('Category GET', () => {

  it("Must send table with category", (done) => {
    chai.request(server)
      .get('/api/categories')
      .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
      });
  });
})

describe('Category GET INFO', () => {
  let idCategory;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/categories')
      .send(
        {
          "title":"title",
          "description":"description"
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.category.should.have.property('_id');
        res.body.informacja.should.equal("Dodano pomyślnie kategorię");
        idCategory = res.body.category._id;
        done();
      });
    });

    it('if category does not exist, return status 400', (done) => {
      chai.request(server)
        .get('/api/categories/58cdbe1ec88b143e9d0a910f')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorFind.should.equal("Kategoria z takim ID nie istnieje");
          done();
        });
    });

    it ('if category exist, show details about it', (done) => {
      chai.request(server)
        .get('/api/categories/'+ idCategory)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        })
    });
  });


describe ('Category Get ProjectID', () => {
  let ProjectID;
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
            "frontEndHtml": 6,
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
        projectID = res.body.Project._id;
        done()
      });
    });

  it ('should send table with categories of project from ID', (done) => {
    chai.request(server)
    .get('/api/categories/project/'+ projectID)
    .end((err,res) => {
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
});


describe('Category POST', () => {
    it('should add category', (done) => {
    chai.request(server)
    .post('/api/categories')
    .send(
      {
        "title":"title",
        "description":"description"
      }
    )
    .end((err,res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.category.should.have.property('_id');
      res.body.informacja.should.equal("Dodano pomyślnie kategorię");
      done();
    });
  });
})


  describe('Category DELETE', () => {

    let categoryID;
    beforeEach((done) => {
      chai.request(server)
        .post('/api/categories')
        .send(
          {
            "title":"title",
            "description":"description"
          }
        )
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.category.should.have.property('_id');
          res.body.informacja.should.equal("Dodano pomyślnie kategorię");
          categoryID = res.body.category._id;
          done()
        })
    })

    it ('if category exist , return status 200 and remove it',(done) => {
      chai.request(server)
        .delete('/api/categories/'+ categoryID)
        .end((err,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.equal("Usunięto kategorię");
          done();
        })
    });

    it('if category does not exist, return status 400', (done) => {
      chai.request(server)
        .delete('/api/categories/589a14f6f097940898a8d0e2')
        .end((err,res) => {
          res.should.have.status(400);
          res.should.be.json;
          done();
        });
    });
  });


describe('Category UPDATE', () => {

  let categoryID;
  beforeEach((done) => {
    chai.request(server)
      .post('/api/categories')
      .send(
        {
          "title":"title",
          "description":"description"
        }
      )
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.category.should.have.property('_id');
        res.body.informacja.should.equal("Dodano pomyślnie kategorię");
        categoryID = res.body.category._id;
        done()
      })
  })

    it('should edit category', (done) => {
      chai.request(server)
        .put('/api/categories/' + categoryID )
        .send(
          {
            "title":"title2",
            "description":"description2"
          }
        )
        .end((req,res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.equal("Zaktualizowano");
          done();
        })
    });

    it('should get error when category does not exist', (done) => {
      chai.request(server)
        .put('/api/categories/589a14f6f097940898a8d0e2')
        .send(
          {
            "title":"title2",
            "description":"description2"
          }
        )
        .end((req,res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.errorID.should.equal("Kategoria z takim ID nie istnieje!")
          done();
        });
    });
});
