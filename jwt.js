require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  verify: (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) res.sendStatus(401);
        else {
          req.user = decoded;
          next();
        }
      });
    }
    res.sendStatus(401);
  },
  signToken: user => jwt.sign({
    data: JSON.stringify(user),
  }, process.env.SECRET, { expiresIn: '1h' }),
};
