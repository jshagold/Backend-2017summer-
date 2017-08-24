var mysql = require('mysql')
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'hack_2017',
    password: '0000',
    database: 'hack_2017'
})


module.exports = connection