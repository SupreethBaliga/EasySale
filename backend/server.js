import express from 'express';
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
var cors = require('cors');

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.post('/api/products/', Product.create);
app.get('/api/products/', Product.getAll);
app.get('/api/products/:id', Product.getOne);
app.put('/api/products/:id', Product.update);
app.delete('/api/products/:id', Product.delete);

app.post('/api/users/', User.create);
app.get('/api/users', User.getAll);
app.get('/api/users/:id', User.getOne);
app.put('/api/users/:id', User.update);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
