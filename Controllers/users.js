const User = require("../Models/Users");
const userLogin = async (req, res) => {

}

const userSignUp = async (req, res) => {
    console.log(req.body);
    try {
        let userDoesExist = await User.findOne({email: req.body.email});

        if (userDoesExist) {
            return res.json({message: "already exist"});
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const result = await newUser.save();
        return res.status(400).send({message: "user created successfully", result: result});
    } catch (err) {
        return res.status(200).send({message: "Error while creating user", result: err});
    }
}

module.exports = {userSignUp};