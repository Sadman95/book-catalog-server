const app = require('./app/index');
const http = require('http');
const {port, db_uri} = require("./config");
const httpServer = http.createServer(app)
const mongoose = require('mongoose')

mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DATABASE CONNECTED!");
    httpServer.listen(port, () => {
        console.log("Server listening on port " + port)
    })
}).catch(err => {
    console.log("Error connecting to database")
})

