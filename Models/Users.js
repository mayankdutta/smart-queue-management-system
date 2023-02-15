const mongoose = require('mongoose');

// const usersSchema = new Schema({
//     UserName: {type: String, required: true, index: {unique: true}},
//     // FirstName  : {type : String, required: true},
//     // LastName : {type : String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, /*type: password, */required: true}
// })

const userSchema = new mongoose.Schema({
  name: String,
  // FirstName  : {type : String, required: true},
  // LastName : {type : String, required: true},
  email: String,
  password: String,
});

module.exports = mongoose.model('users', userSchema);
