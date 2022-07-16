const Users = require("../Models/Users");
const bcrypt = require("bcrypt");
require("dotenv").config()

const SALT = 10;

async function hashPassword(plaintextPassword) {
    // Store hash in the database
    return await bcrypt.hash(plaintextPassword, SALT);
}

// compare password
async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}

const userLogin = async (req, res) => {
    try {
        const user = await Users.findOne({
            email: req.body.email
        });

        const userDoesExist = comparePassword(req.body.password, user.password);
        if (userDoesExist) {
            return res.status(400).send({message: "user found"});
        } else {
            return res.status(200).send({message: "user NOT found"});
        }

    } catch (err) {
        return res.status(200).send({message: "something went wrong while logging in", error: err});
    }
}

const userSignUp = async (req, res) => {
    try {
        let userDoesExist = await Users.findOne({email: req.body.email});

        if (userDoesExist) {
            return res.status(200).send({message: "already exist"});
        }

        try {
            const newPassword = await hashPassword(req.body.password);
            const user = new Users({
                name: req.body.name,
                email: req.body.email,
                password: newPassword
            });

            const result = await user.save();

            return res.status(400).send({message: "user created successfully", result: result});
        } catch (err) {
            return res.status(200).send({message: err.message});
        }

    } catch (err) {
        return res.status(200).send({message: "Error while creating user", result: err});
    }
}

module.exports = {userSignUp, userLogin};