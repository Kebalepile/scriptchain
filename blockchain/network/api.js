"use strict"
const api = require("express")(),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    routes = require("./routes")
api.use(cors())
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))

api.use('/api', routes)
// fallback for any path that returns a 404
api.all(/(^\/.{0,})/, (req, res) => res.redirect(301, '/api'))

module.exports = { api }

