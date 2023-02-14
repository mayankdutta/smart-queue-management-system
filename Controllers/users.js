const Users = require("../Models/Users");
const { HTTP_STATUS_CODES } = require("../domain/statusCodes");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT = 10;

async function hashPassword(plaintextPassword) {
  return await bcrypt.hash(plaintextPassword, SALT);
}

async function comparePassword(plaintextPassword, hash) {
  return await bcrypt.compare(plaintextPassword, hash);
}

async function generateAccessToken(username) {
  return await jwt.sign(username, process.env.TOKEN_SECRET, {}, { expiresIn: "2h" });
}

const verifyAccessToken = (req, res, next) => {
  const userToken = req.headers["access-token"];
  if (!userToken) {
    return res.status(400).json({ messsage: "token is required !!" });
  }
  try {
    const decodeUserToken = jwt.verify(userToken, process.env.TOKEN_SECRET, {}, {});
  } catch (err) {
    return res.status(400).json({ message: "invalid user" });
  }
  next();
};

const userSignUp = async (req, res) => {
  try {
    let userDoesExist = await Users.findOne({ email: req.body.email });

    if (userDoesExist) {
      return res.status(400).send({ message: "already exist" });
    }

    try {
      const encryptedPassword = await hashPassword(req.body.password);
      const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });

      const accessToken = await generateAccessToken(req.body.email);
      const result = await user.save();

      return res.status(200).send({
        message: "user created successfully",
        accessToken: accessToken,
      });
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  } catch (err) {
    return res.status(500).send({ message: "Error while creating user", result: err });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    });

    const userPassword = req.body.password;
    const encryptedPassword = user.password;

    const userDoesExist = await comparePassword(userPassword, encryptedPassword);
    if (userDoesExist) {
      const accessToken = await generateAccessToken(req.body.email);
      return res
        .status(HTTP_STATUS_CODES.OK)
        .send({ message: "user found", accessToken: accessToken, name: user.name });
    } else {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ message: "user NOT found" });
    }
  } catch (err) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ message: "something went wrong while logging in", error: err });
  }
};

module.exports = { userSignUp, userLogin };
