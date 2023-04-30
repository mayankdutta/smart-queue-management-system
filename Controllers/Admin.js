
const Users = require("../Models/Users");
const getUserObject = require('../middleware/decodeUser');


const AdminAction = async ({body, headers}, res) => {
  let {email, role} = body;
  let token = getUserObject(headers['access-token']);
  if (!token || !token.role === 'admin') return res.status(401).send("unauthorized");
  if (!email) return res.status(400).send("Bad request");
  try {
    Users.findOneAndUpdate({ email }, { role }, { new: true }, (err, user) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(user)
    });
  }
  catch (err) {
    res.status(500).send(err)
  }
}

module.exports = { AdminAction }