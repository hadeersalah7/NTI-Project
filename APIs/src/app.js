require("dotenv").config()
require("../db/connection")

const express = require("express")

const app = express()

app.use(express.json())


const userRoutes = require("../routes/user.routes")

app.use("/user", userRoutes)

app.get("*", (req,res) => res.status(404).send({
    apiStatus: false,
    message: "Incorrect Link Path"
}))

module.exports = app
