const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ControlePortaria'
})

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log("Banco Conectado!")
    }
})

module.exports = connection