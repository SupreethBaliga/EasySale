                                 // PAYMENT PORTAL CODE  - DON'T TOUCH IT 

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ejs = require("ejs");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const {initPayment, responsePayment} = require("./paytm/services/index");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");

app.get("/api/paywithpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});

app.post("/api/paywithpaytmresponse", (req, res) => {
    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});

app.listen(PORT, () => {
    console.log("Running on " + PORT);
});

                                                                    // MAIN APP PART

// import express from 'express';
import 'babel-polyfill';
// const bodyParser = require('body-parser');
// let cors = require('cors');
// const app = express();
// require("dotenv").config();
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order';
import Favourites from './src/controllers/Favourites';
import Cart from './src/controllers/Cart';


const multer = require('multer');
let auth = require('./src/controllers/Authentication');
const fs = require('fs');
const port = process.env.PORT || 8000;



const flash = require('connect-flash');
const passport = require("passport");
const expressSession = require('express-session');



app.engine('html', require('ejs').renderFile);
app.use(express.json())
app.use(require('cookie-parser')());
app.use(expressSession({ secret: 'mySecretKey',
cookie: {
    path: '/',
    domain: 'easysale.live',
    httpOnly: true
}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use(flash());
app.use(bodyParser());

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Testing for Server' });
})

app.post('/api/products/', Product.create);
app.get('/api/products/', Product.getAll);
app.get('/api/products/:id', Product.getOne);
app.put('/api/products/:id', Product.update);
app.delete('/api/products/:id', Product.delete);

// app.get('/api/users/', User.getAll);
app.get('/api/users/:id', User.getOne);
app.put('/api/users/:id', User.update);

app.post('/api/orders/', Order.create);
app.get('/api/orders/', Order.getAll);
app.get('/api/orders/pending/', Order.getAllPending);
app.get('/api/orders/:user_id', Order.getOneUser);
app.get('/api/orders/by/:orderNumber', Order.getOne);
app.put('/api/orders/:orderNumber', Order.updateStatus);
app.put('/api/orders/expdate/:orderNumber', Order.updateDate);

app.get('/api/join/', auth.getjoin);
app.post('/api/join/', auth.postjoin);
app.get('/api/account/', auth.getaccount);
app.get('/api/login/', auth.getlogin);
app.post('/api/login/', auth.authFunction, auth.postlogin);
app.get('/api/logout/', auth.getlogout);
app.get('/api/getuser/', auth.auth);
app.get('/api/successJson',(req,res) => {
    res.send('Login Successful');
})
app.get('/api/failureJson',(req,res) => {
    res.send('Login Failed');
})

app.post('/api/favs/', Favourites.create);
// app.get('/api/favs/', Favourites.getAll);
app.get('/api/favs/:user_id', Favourites.getOneUser);
app.delete('/api/favs/:user_id/:product_id', Favourites.delete);

app.post('/api/cart/', Cart.create);
// app.get('/api/cart/', Cart.getAll);
app.get('/api/cart/:user_id', Cart.getOneUser);
// app.put('/api/cart/:user_id/:id', Cart.update);
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
            });
        return res.status(200);
    }
});
app.use(function (err, req, res) {
    if (err instanceof multer.MulterError) res.status(500).send(err.message);
});

// app.listen(port, () => {
//     console.log(`App running on port ${port}`);
// })
