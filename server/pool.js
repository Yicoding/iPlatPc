let mysql = require('mysql')
let pool  = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'iplat'
})

module.exports = pool