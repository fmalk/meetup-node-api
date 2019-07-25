const express = require('express');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'ensembldb.ensembl.org',
    user : 'anonymous',
    password : null,
    database : 'acanthochromis_polyacanthus_core_94_1'
  }
});
const router = express.Router();

// SELECT * FROM acanthochromis_polyacanthus_core_94_1.biotype limit 1;

router.get('/', (req, res) => {
  knex
    .table('biotype').first().then(row => res.json(row))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
