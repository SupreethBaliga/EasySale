const pg = require('pg');


const pool = new pg.Pool({
	user : 'baliga',
	host : 'localhost',
	database : 'client',
	password : 'nankariboy',
});


pool.query("CREATE TABLE IF NOT EXISTS products (productID serial PRIMARY KEY, productNumber int NOT NULL, productName varchar(50) NOT NULL, price int, description varchar(2000), image varchar(200))"
	, (err, res) => {
	console.log(err, res);
	pool.end();
});
