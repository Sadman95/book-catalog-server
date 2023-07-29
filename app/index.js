const express = require('express');
const webApp = express();
const cors = require('cors');
const bodyparser = require('body-parser');

webApp.use(cors());
webApp.use(express.json());
webApp.use(express.urlencoded({ extended: true}));
webApp.use(bodyparser.json());
webApp.use(bodyparser.urlencoded({ extended: true}));

webApp.get('/', function(req, res) {
    res.send("Welcome")
})

module.exports = webApp