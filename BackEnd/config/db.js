const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@w0rk421390977909*",
  database: "ControlePortaria",
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Banco Conectado!");
  }
});

module.exports = connection;
