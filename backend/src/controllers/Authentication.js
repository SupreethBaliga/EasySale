const passport = require("passport");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

function getjoin (req, res) {
    res.render('./join.html', {title: "Join", userData: req.user });
}

async function postjoin (req, res) {
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
                    console.log(result.command);
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
}

function getaccount(req, res) {
    if(req.isAuthenticated()){
        res.render('./account.html', {title: "Account", userData: req.user});
    }
    else{
        res.redirect('/api/login');
    }
}

function auth(req)
{
    if(req.isAuthenticated())
    {
        return req.session.passport.user[0];
    }
    else return null;
}

function getlogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/api/account');
    }
    else{
        res.render('./login.html', {title: "Log in", userData: req.user});
    }
}

var authFunction = passport.authenticate('local', {
    successRedirect: '/api/account',
    failureRedirect: '/api/login',
    failureFlash: true
})

function postlogin(req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expires = false;
    }
res.redirect('/api/login');
}

function getlogout(req, res){
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    // req.flash(‘success’, “Logged out. See you soon!”);
    res.redirect('/api/login');
}

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
                        return done(null, [{email: result.rows[0].email, name: result.rows[0].name, id: result.rows[0].id}]);
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

module.exports = {
    auth,
    getjoin,
    postjoin,
    getaccount,
    getlogin,
    postlogin,
    getlogout,
    authFunction
}