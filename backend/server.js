import express from 'express';
const multer = require('multer');
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order';
var cors = require('cors');

const port = 8000;

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.post('/api/products/', Product.create);
app.get('/api/products/', Product.getAll);//done in both seller and client
app.get('/api/products/:id', Product.getOne);
app.put('/api/products/:id', Product.update);
app.delete('/api/products/:id', Product.delete);

app.post('/api/users/', User.create);
app.post('/api/users/login/', User.login);
app.get('/api/users/', User.getAll);
app.get('/api/users/:id', User.getOne);
app.put('/api/users/:id', User.update);//done

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
	else return res.status(200);
});

app.use(function (err, req, res) {
	if (err instanceof multer.MulterError) res.status(500).send(err.message);
});

app.listen(port, () => {
	console.log(`App running on port ${port}`);
})