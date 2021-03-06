const passport = require("passport");
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const { Pool } = require('pg');

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
        await JSON.stringify(client.query('SELECT id FROM users WHERE email=$1', [req.body.email], function(err, result) {
            if(result.rows[0]){
                // req.flash(‘warning’, “This email address is already registered. <a href=’/login’>Log in!</a>”);
                res.redirect('/api/join');
            }
            else{
                client.query(`INSERT INTO
                    users(id, name, email, password, contactNumber, deliveryAddress, deliveryPostalCode, organisationName, GSTNumber, officeNumber, companyAddress, companyPostalCode)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                    [
                        uuidv4(),
                        req.body.name,
                        req.body.email,
                        pwd,
                        req.body.contactNumber,
                        req.body.deliveryAddress,
                        req.body.deliveryPostalCode,
                        req.body.organisationName,
                        req.body.GSTNumber,
                        req.body.officeNumber,
                        req.body.companyAddress,
                        req.body.companyPostalCode
                    ], function(err, result) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            client.query('COMMIT')
                            // req.flash(‘success’,’User created.’)
                            res.redirect('/api/login');
                            return;
                        }
                });
            }
        }));
        client.release();
    }
    catch(e) {
        throw(e)
    }
}

function getaccount(req, res) {
    if(req.isAuthenticated()){
        res.render('./account.html', {title: "Account", userData: req.user});
    }
    else{
        res.redirect('/api/login');
    }
}

function auth(req,res) {
    if(req.isAuthenticated()) {
        res.send(req.session.passport.user[0]) ;
    } else {
        res.send("null");
    }
}

function authuser(req) {
    if(req.isAuthenticated()) {
        return(req.session.passport.user[0]) ;
    } else {
        return null;
    }
}

function getlogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/api/account');
    }else {
        res.render('./login.html', {title: "Log in", userData: req.user});
    }
}

var authFunction = passport.authenticate('local', {
    successRedirect: '/api/successJson',
    failureRedirect: '/api/failureJson',
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
    req.logout();
    res.redirect('/api/login');
}

passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
    loginAttempt();
    async function loginAttempt() {
        const client = await pool.connect()
        try{
            await client.query('BEGIN')
            var currentAccountsData = await JSON.stringify(client.query(
                `SELECT
                id, name, email, password, contactNumber, deliveryAddress, deliveryPostalCode, organisationName, GSTNumber, officeNumber, companyAddress, companyPostalCode
                FROM users WHERE email=$1`,
                [username], function(err, result) {
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
                                return done();
                            }
                            else if (check){
                                return done(null, [{email: result.rows[0].email, name: result.rows[0].name, id: result.rows[0].id, org: result.rows[0].organisationname}]);
                            }
                            else{
                                // req.flash(‘danger’, “Oops. Incorrect login details.”);
                                return done(null, false);
                            }
                        });
                    }
                }
            ))
        }
        catch(e){
            throw (e);
        }
    };
}))

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = {
    authuser,
    auth,
    getjoin,
    postjoin,
    getaccount,
    getlogin,
    postlogin,
    getlogout,
    authFunction
}
