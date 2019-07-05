import express from 'express';
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order'
let auth = require('./src/controllers/Authentication');

let cors = require('cors');
const port = process.env.PORT || 8000;
const flash = require('connect-flash');
const passport = require("passport");
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json())

app.engine('html', require('ejs').renderFile);
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname + '/public'));
app.use(flash());
app.use(bodyParser());
app.use(express.static('public')); 

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'Testing for Server'});
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

app.get('/api/join', auth.getjoin);
app.post('/api/join', auth.postjoin);
app.get('/api/account', auth.getaccount);
app.get('/api/login', auth.getlogin);
app.post('/api/login', auth.authFunction, auth.postlogin);
app.get('/api/logout', auth.getlogout);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
