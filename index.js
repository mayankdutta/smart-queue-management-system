const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require("./Routes/routes")

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.p3bweb9.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log("Database not connecting")
    console.log(err);
})

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
})