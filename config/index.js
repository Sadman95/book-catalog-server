const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    env: process.env.NODE_ENV,
    db_uri: process.env.DB_URI,
    port: process.env.PORT
}