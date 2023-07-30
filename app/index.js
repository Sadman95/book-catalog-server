const express = require('express');
const webApp = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const errorHandler = require("./error");
const morgan = require('morgan');

webApp.use(cors());
webApp.use(morgan("dev"));
webApp.use(express.json());
webApp.use(express.urlencoded({ extended: true}));
webApp.use(bodyparser.json());
webApp.use(bodyparser.urlencoded({ extended: true}));


webApp.use(errorHandler.localErrorHandler)
webApp.use(errorHandler.globalErrorHandler)

module.exports = webApp