import express from 'express';
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order';
import Favourites from './src/controllers/Favourites';
import Cart from './src/controllers/Cart';

const multer = require('multer');
let auth = require('./src/controllers/Authentication');
const fs = require('fs');
const port = 8000;
let cors = require('cors');
const flash = require('connect-flash');
const passport = require("passport");
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(express.json())
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname + '/public'));
app.use(flash());
app.use(bodyParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Testing for Server' });
})

app.post('/api/products/', Product.create);
app.get('/api/products/', Product.getAll);//done in both seller and client
app.get('/api/products/:id', Product.getOne);
app.put('/api/products/:id', Product.update);
app.delete('/api/products/:id', Product.delete);

app.post('/api/users/', User.create);
app.get('/api/users/', User.getAll);
app.get('/api/users/:id', User.getOne);
app.put('/api/users/:id', User.update);

app.post('/api/orders/', Order.create);//done
app.get('/api/orders/', Order.getAll);
app.get('/api/orders/pending/', Order.getAllPending);
app.get('/api/orders/:user_id', Order.getOneUser);
app.get('/api/orders/:orderNumber', Order.getOne);
app.put('/api/orders/:orderNumber', Order.update);

app.get('/api/join/', auth.getjoin);
app.post('/api/join/', auth.postjoin);
app.get('/api/account/', auth.getaccount);
app.get('/api/login/', auth.getlogin);
app.post('/api/login/', auth.authFunction, auth.postlogin);
app.get('/api/logout/', auth.getlogout);
app.get('/api/getuser/', auth.auth);

app.post('/api/favs/', Favourites.create);
app.get('/api/favs/', Favourites.getAll);
app.get('/api/favs/:user_id', Favourites.getOneUser);
app.delete('/api/favs/:user_id/:product_id', Favourites.delete);

app.post('/api/cart/', Cart.create); //done for both product Card and page
app.get('/api/cart/', Cart.getAll); //not there
app.get('/api/cart/:user_id', Cart.getOneUser);//done
app.put('/api/cart/:user_id/:id', Cart.update);// not used
app.delete('/api/cart/:user_id/:id', Cart.deleteProduct);//done
app.delete('/api/cart/:user_id', Cart.deleteCart);//done

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