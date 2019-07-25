const express = require('express');
const jwt = require('../jwt');

const router = express.Router();

router.get('/', jwt.verify, (req, res) => {
  res.json({ message: 'Acesso concedido' });
});

router.get('/anon', (req, res) => {
  const token = jwt.signToken({ user: 'Anonimo' });
  res.json({ token });
});

module.exports = router;
