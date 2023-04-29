const Users = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require("dotenv").config()

const SALT = 10;

async function hashPassword(plaintextPassword) {
    return await bcrypt.hash(plaintextPassword, SALT);
}

async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}

async function generateAccessToken(username, role) {
    return await jwt.sign({username, role}, process.env.TOKEN_SECRET, {}, {expiresIn: '2h'});
}

const verifyAccessToken = (req, res, next) => {
    const userToken = req.headers["access-token"];
    if (!userToken) {
        return res.status(400).json({messsage: "token is required !!"});
    }
    try {
        const decodeUserToken = jwt.verify(userToken, process.env.TOKEN_SECRET, {}, {});
    } catch (err) {
        return res.status(400).json({message: "invalid user"});
    }
    next();
}

const userSignUp = async ({body}, res) => {
    let {email, password, role = "user", name} = body;
    try {
        let userDoesExist = await Users.findOne({email});

        if (userDoesExist) {
            return res.status(400).send({message: "already exist"});
        }

        try {
            password = await hashPassword(password);
            const user = new Users({ role, name, email,password });
            const {email: userEmail, role: userRole = "user"} = user;
            const accessToken = await generateAccessToken(userEmail, userRole);
            await user.save();

            return res.status(200).send({
                message: "user created successfully",
                accessToken,
                role: userRole,
            });

        } catch ({message}) {
            return res.status(400).send({message});
        }

    } catch (err) {
        return res.status(500).send({message: "Error while creating user", result: err});
    }
}

const userLogin = async ({body = {}}, res) => {
    let {email: userEnteredEmail = "", password: userEnteredPass = "", name} = body;
    try {
        const {password: encryptedPassword, email, role = "user"} = await Users.findOne({
            email: userEnteredEmail
        });
        const userDoesExist = await comparePassword(userEnteredPass, encryptedPassword);
        if (userDoesExist) {
            const accessToken = await generateAccessToken(email, role);
            return res.status(200).send({message: "user found", accessToken, name, role,});
        } else {
            return res.status(400).send({message: "user Not found"});
        }

    } catch (err) {
        return res.status(500).send({message: "something went wrong while logging in", error: err});
    }
}


module.exports = {userSignUp, userLogin};