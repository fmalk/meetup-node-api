const express = require('express');
const uuid = require('uuid');

const router = express.Router();

const remarks = new Map();

/* GET all remarks */
router.get('/', (req, res) => {
  res.json(Array.from(remarks));
});
/* POST a new remark */
router.post('/', (req, res) => {
  const remark = req.body;
  remark.id = uuid.v4();
  remarks.set(remark.id, remark);
  res.json(remark);
});
/* UPDATE a remark */
router.put('/', (req, res) => {
  const remark = req.body;
  remarks.set(remark.id, remark);
  res.json(remark);
});
/* DELETE a remark */
router.delete('/:id', (req, res) => {
  remarks.delete(req.params.id);
  res.sendStatus(200);
});
/* GET a remark */
router.get('/:id', (req, res) => {
  const remark = remarks.get(req.params.id);
  res.json(remark);
});

module.exports = router;
