import express from 'express';
const multer = require('multer');
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order';
const fs = require('fs');
var cors = require('cors');

const port = 8000;

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
	return res.status(200).send({ 'message': 'Testing for Server' });
})

app.post('/api/products/', Product.create);
app.get('/api/products/', Product.getAll);
app.get('/api/products/:id', Product.getOne);
app.put('/api/products/:id', Product.update);
app.delete('/api/products/:id', Product.delete);

app.post('/api/users/', User.create);
app.get('/api/users/', User.getAll);
app.get('/api/users/:id', User.getOne);
app.put('/api/users/:id', User.update);

app.post('/api/orders/', Order.create);
app.get('/api/orders/', Order.getAll);
app.get('/api/orders/:orderNumber', Order.getOne);
app.put('/api/orders/:orderNumber', Order.update);

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../seller/src/assets/images');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage });

app.post('/api/imageupload', upload.single('imagefile'), function (req, res) {
	if (!req.file) return res.status(400);
	else {
		fs.copyFile('../seller/src/assets/images/' + req.file.originalname, '../client/src/assets/images/' + req.file.originalname,
			(err) => {
				if (err) console.log(err);
				else console.log('image copied');
			});
		return res.status(200);
	}
});

app.use(function (err, req, res) {
	if (err instanceof multer.MulterError) res.status(500).send(err.message);
});

app.listen(port, () => {
	console.log(`App running on port ${port}`);
})