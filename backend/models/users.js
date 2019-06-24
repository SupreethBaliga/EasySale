const pg = require('pg');


const pool = new pg.Pool({
	user : 'baliga',
	host : 'localhost',
	database : 'client',
	password : 'nankariboy',
});


pool.query("CREATE TABLE IF NOT EXISTS users (GSTnumber varchar(15) PRIMARY KEY, clientName varchar(50) NOT NULL, legalBusinessName varchar(100) NOT NULL, organisationName varchar(100) NOT NULL, contactNumber varchar(15) UNIQUE NOT NULL, email varchar(50), address varchar(200))"
	, (err, res) => {
	console.log(err, res);
	pool.end();
});
