const express = require('express');
const fs = require('fs');
const bluebird = require('bluebird');

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile(__dirname + '/../public/arquivo.json', 'utf8', (err, data) => {
    if (err) res.status(500).send(err);
    else res.json(JSON.parse(data));
  });
});

const fs2 = bluebird.promisifyAll(require("fs"));
router.get('/promise', (req, res) => {
  fs2.readFileAsync(__dirname + '/../public/arquivo.json', 'utf8')
    .then(data => {
      res.json(JSON.parse(data));
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
