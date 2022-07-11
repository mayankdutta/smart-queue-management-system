const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const UsersSchema = new Schema({
//     UserName: {type: String, required: true, index: {unique: true}},
//     // FirstName  : {type : String, required: true},
//     // LastName : {type : String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, /*type: password, */required: true}
// })

const UsersSchema = new Schema({
    UserName: String,
    // FirstName  : {type : String, required: true},
    // LastName : {type : String, required: true},
    email: String,
    password: String
})

const Users = mongoose.model('Users', UsersSchema)
module.export = Users