const express = require('express');
const Joi = require('@hapi/joi');

const router = express.Router();

const schema = Joi.object()
  .keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2 })
  })
  .with('username', 'birthyear')
  .without('password', 'access_token');

router.post('/', (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) res.status(400).send(error.details);
  else res.json({ message: 'Input válido' });
});

module.exports = router;
