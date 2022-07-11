const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

console.log("here");

const routes = require("./Routes/routes")

console.log("there");

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;
const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.p3bweb9.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("DATABASE CONNECTED");
}).catch((err) => {
    console.log("DATABASE NOT CONNECTED")
    console.log(err);
})

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})