const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
const crypto = require('crypto');

chai.use(chaiHttp);

  // describe('Files POST', () =>{
  //
  //   it("Must add files", (done) => {
  //     chai.request(server)
  //       .get('/api/files')
  //       .send(
  //         {
  //
  //         }
  //       )
  //       .end((err,res) => {
  //           res.should.have.status(200);
  //           res.should.be.json;
  //           done();
  //       })
  //   });
  // })

describe('Files DELETE', () => {
//   it("Must delete files", (done) => {
//     chai.request(server)
//       .delete('/api/files')
//
//       .end((err,res) => {
//         res.should.have.status(200);
//         res.should.be.json;
//         done();
//       })
//   });

  it("Must send error if deleted file not exist", (done) => {
    chai.request(server)
      .delete('/api/files/58cec42a60cd47678acc1fa7')
      .end((err,res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      })
  });
});
