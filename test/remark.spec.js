const express = require('express');
const remarksRouter = require('../routes/remarks');
const request = require('supertest');
const assert = require('assert');

const app = express();
app.use(express.json());
app.use('/remarks', remarksRouter);

describe('Teste Unitário', function() {
    it('Deve salvar uma Remark e retornar as Remarks', function() {
      return request(app)
        .post('/remarks')
        .set('Accept', 'application/json')
        .send({ message: 'teste 2' })
        .expect(200)
        .then(() => {

          return request(app)
            .get('/remarks')
            .expect(200)
            .then((result) => {
              assert(result.body.length >= 1);
            });
        });
    });
});
