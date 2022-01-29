const mysql = require("mysql2/promise");

const connection = async () =>
  await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@RedCode2@",
    port: 3306,
    database: "assignment_2",
  });

module.exports = connection;
