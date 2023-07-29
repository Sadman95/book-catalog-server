const app = require('./app/index');
const http = require('http');
const httpServer = http.createServer(app)

const PORT = 5000

httpServer.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})