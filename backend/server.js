import express from 'express';
import 'babel-polyfill';
import Product from './src/controllers/Product';
import User from './src/controllers/User';
import Order from './src/controllers/Order'
var cors = require('cors');

const port = process.env.PORT || 8000;
const flash = require('connect-flash');
const passport = require("passport");
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;


const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

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

// // join
// app.get('/api/join',Authentication.getjoin);
// app.post('/api/join',Authentication.postjoin);

// // account
// app.get('/api/account',Authentication.getaccount);

// // login
// app.get('/api/login',Authentication.getlogin);
// app.post('/api/login', passport.authenticate('local', {
//   successRedirect: '/account',
//   failureRedirect: '/login',
//   failureFlash: 'not authenticated'
//   }), function(req, res) {
//       if (req.body.remember) {
//           req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
//       } else {
//           req.session.cookie.expires = false; // Cookie expires at end of session
//       }
//       res.send("redirected to login");
//       // res.redirect('/login');
// });

// // logout
// app.get('/api/logout',Authentication.getlogout);

// // passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, email, password, done) => {
// passport.use(new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
//   loginAttempt();
//   console.log("using it");
//   async function loginAttempt() {
//       const client = await pool.connect()
//       console.log("using it");
//       try{
//           await client.query('BEGIN')
//           var currentAccountsData = await JSON.stringify(client.query('SELECT * FROM "user" WHERE "email"=$1', [username], function(err, result) {    
//               if(err) {
//                   return done(err)
//               } 
//               if(result.rows[0] == null){
//                   req.flash('danger', "Oops. Incorrect login details.");
//                   return done(null, false);
//               }
//               else{
//                   bcrypt.compare(password, result.rows[0].password, function(err, check) {
//                       if (err){
//                           console.log('Error while checking password');
//                           return done();
//                       }
//                       else if (check){
//                           return done(null, [{email: result.rows[0].email, name: result.rows[0].name}]);
//                       }
//                       else{
//                       req.flash('danger', "Oops. Incorrect login details.");
//                       return done(null, false);
//                       }
//                   });
//               }
//           }))
//       }
//       catch(e){throw (e);}
//   };        
// }))
         
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });
app.get('/api/join', function (req, res, next) {
  res.render('./join.html', {title: "Join", userData: req.user });
});
  
  
app.post('/api/join', async function (req, res) {
    try{
        const client = await pool.connect()
        await client.query('BEGIN')
        var pwd = await bcrypt.hash(req.body.password, 5);
        await JSON.stringify(client.query('SELECT id FROM "users" WHERE "email"=$1', [req.body.username], function(err, result) {
        if(result.rows[0]){
        // req.flash(‘warning’, “This email address is already registered. <a href=’/login’>Log in!</a>”);
            res.redirect('/api/join');
        }
        else{
            client.query('INSERT INTO "users" (id, name, email, password,contactnumber,deliveryaddress,deliverypostalcode,organisationname,gstnumber,officenumber,companyaddress,companypostalcode) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12)', [uuidv4(), req.body.name, req.body.username, pwd,req.body.contactnumber,req.body.deliveryaddress,req.body.deliverypostalcode,req.body.organisationname,req.body.gstnumber,req.body.officenumber,req.body.companyaddress,req.body.companypostalcode], function(err, result) {
                if(err){console.log(err);}
                else {
                    client.query('COMMIT')
                    console.log(result)
                    // req.flash(‘success’,’User created.’)
                    res.redirect('/api/login');
                    return;
                }
            });
        } 
        }));
    client.release();
    } 
    catch(e)
        {throw(e)}
});

app.get('/api/account', function (req, res, next) {
    if(req.isAuthenticated()){
        res.render('./account.html', {title: "Account", userData: req.user});
    }
    else{
        res.redirect('/api/login');
    }
});

app.get('/api/login', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/api/account');
    }
    else{
        res.render('./login.html', {title: "Log in", userData: req.user});
    }
});
          
app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/api/account',
    failureRedirect: '/api/login',
    failureFlash: true
    }), function(req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
    res.redirect('/api/login');
});

app.get('/api/logout', function(req, res){
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    // req.flash(‘success’, “Logged out. See you soon!”);
    res.redirect('/api/login');
});

passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
    loginAttempt();
    async function loginAttempt() {
        const client = await pool.connect()
    try{
        await client.query('BEGIN')
        var currentAccountsData = await JSON.stringify(client.query('SELECT id, name, email, password,contactnumber,deliveryaddress,deliverypostalcode,organisationname,gstnumber,officenumber,companyaddress,companypostalcode FROM "users" WHERE "email"=$1', [username], function(err, result) {
            if(err) {
                return done(err)
            } 
            if(result.rows[0] == null){
            // req.flash(‘danger’, “Oops. Incorrect login details.”);
                return done(null, false);
            }
            else{
                bcrypt.compare(password, result.rows[0].password, function(err, check) {
                    if (err){
                        console.log('Error while checking password');
                        return done();
                    }
                    else if (check){
                        return done(null, [{email: result.rows[0].email, name: result.rows[0].name}]);
                    }
                    else{
                    // req.flash(‘danger’, “Oops. Incorrect login details.”);
                        return done(null, false);
                    }
                });
            }
        }))
    }
    catch(e){throw (e);}
};}))
    
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
