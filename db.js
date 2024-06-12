const Pool = require("pg-pool");
require('dotenv').config()

const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    max: 20,
    idleTimeoutMillis: 100,
    connectionTimeoutMillis: 1000,
  })

module.exports = pool
