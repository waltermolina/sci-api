const { createPool } = require("mysql");

//npmjs.com/package/mysql
const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  connectionLimit: 10,
  connectTimeout: 100000,
  multipleStatements: true
});

module.exports = pool;
