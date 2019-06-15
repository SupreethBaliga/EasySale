const pg = require('pg');


const pool = new pg.Pool({
	user : 'baliga',
	host : 'localhost',
	database : 'client',
	password : 'nankariboy',
});


pool.query("CREATE TABLE IF NOT EXISTS orders (orderNumber serial PRIMARY KEY, productID varchar[], quantity int[], specifications text[], amount int, deliveryTime varchar(100))"
	, (err, res) => {
	console.log(err, res);
	pool.end();
});
