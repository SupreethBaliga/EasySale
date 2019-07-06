import express from 'express';
const multer = require('multer');
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order';
import Favourites from './src/controllers/Favourites';
import Cart from './src/controllers/Cart';
const fs = require('fs');
var cors = require('cors');

const port = 8000;

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
	return res.status(200).send({ 'message': 'Testing for Server' });
})

app.post('/api/products/', function(req,res){return Product.create});
app.get('/api/products/', Product.getAll);//done in both seller and client
app.get('/api/products/:id', Product.getOne);
app.put('/api/products/:id', Product.update);
app.delete('/api/products/:id', Product.delete);

app.post('/api/users/', function(req,res){return User.create});
app.post('/api/users/login/', function(req,res){return User.login});
app.get('/api/users/', User.getAll);
app.get('/api/users/:id', User.getOne);
app.put('/api/users/:id', User.update);

app.post('/api/orders/', Order.create);
app.get('/api/orders/', Order.getAll);
app.get('/api/orders/:orderNumber', Order.getOne);
app.put('/api/orders/:orderNumber', Order.update);

app.post('/api/orders/', function(req,res){return Order.create});
app.get('/api/orders/', Order.getAll);
app.get('/api/orders/:orderNumber', Order.getOne);
app.put('/api/orders/:orderNumber', Order.update);

app.post('/api/favs/', Favourites.create);
app.get('/api/favs/', Favourites.getAll);
app.get('/api/favs/:user_id', Favourites.getOneUser);
app.delete('/api/favs/:user_id/:product_id', Favourites.delete);

app.post('/api/cart/', Cart.create);
app.get('/api/cart/', Cart.getAll);
app.get('/api/cart/:user_id', Cart.getOneUser);
app.put('/api/cart/:user_id/:id', Cart.update);
app.delete('/api/cart/:user_id/:id', Cart.deleteProduct);
app.delete('/api/cart/:user_id', Cart.deleteCart);

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
