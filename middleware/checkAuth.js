const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = checkAuth = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    try {
      const success = await Jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (err) {
      res.status(404).json({
        message: 'invalid token, backend',
        result: err,
      });
    }
  } else {
    res.status(401).send({
      result: 'invalid credentials, backend',
    });
  }
};
