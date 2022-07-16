const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require("./Routes/routes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DATABASE CONNECTED");
}).catch((err) => {
    console.log("DATABASE NOT CONNECTED")
    console.log(err);
})

app.use("/", routes);

app.listen(process.env.API_PORT, () => {
    console.log(`server is running on port : ${process.env.API_PORT}`)
})