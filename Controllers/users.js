const { HTTP_STATUS_CODES } = require('../domain/statusCodes');

const Users = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SALT = 10;

async function hashPassword(plaintextPassword) {
  return await bcrypt.hash(plaintextPassword, SALT);
}

async function comparePassword(plaintextPassword, hash) {
  return await bcrypt.compare(plaintextPassword, hash);
}

async function generateAccessToken(username, role) {
  return await jwt.sign({ username, role }, process.env.TOKEN_SECRET, {}, { expiresIn: '2h' });
}

const verifyAccessToken = (req, res, next) => {
  const userToken = req.headers['access-token'];
  if (!userToken) {
    return res.status(HTTP_STATUS_CODES.OK).json({ messsage: 'token is required !!' });
  }
  try {
    const decodeUserToken = jwt.verify(userToken, process.env.TOKEN_SECRET, {}, {});
  } catch (err) {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'invalid user' });
  }
  next();
};

const userSignUp = async (req, res) => {
  try {
    let userDoesExist = await Users.findOne({ email: req.body.email });

    if (req.body.email.length == 0 || req.body.password.length == 0) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Enter valid email id / password" });
    }

    if (userDoesExist) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'already exist' });
    }

    try {
      const encryptedPassword = await hashPassword(req.body.password);
      const user = new Users({
        role: req.body.role ? req.body.role : 'user',
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });

      const accessToken = await generateAccessToken(user.email, user.role);
      const result = await user.save();

      return res.status(HTTP_STATUS_CODES.OK).send({
        message: 'user created successfully',
        accessToken: accessToken,
        role: user.role ? user.role : 'user',
      });
    } catch (err) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: err.message });
    }
  } catch (err) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: 'Error while creating user', result: err });
  }
};

const userLogin = async (req, res) => {
  try {

    if (req.body.email.length == 0 || req.body.password.length == 0) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ message: "Enter valid email id / password" });
    }

    const user = await Users.findOne({
      email: req.body.email,
    });

    const userPassword = req.body.password;
    const encryptedPassword = user.password;

    const userDoesExist = await comparePassword(userPassword, encryptedPassword);

    if (userDoesExist) {
      const accessToken = await generateAccessToken(user.email, user.role);

      return res.status(HTTP_STATUS_CODES.OK).send({
        message: 'user found',
        accessToken: accessToken,
        name: user.name,
        role: user.role,
      });
    } else {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: 'user NOT found' });
    }
  } catch (err) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: 'something went wrong while logging in', error: err });
  }
};

module.exports = { userSignUp, userLogin };
