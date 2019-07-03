// import db from '../db';
const express = require('express');
const flash = require('connect-flash');
const passport = require("passport");
const request = require('request');
const session = require('express-session');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const path  = require('path');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;


const {Pool} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

var passportauth = passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true
    });

const Authentication = {
    getjoin(req,res)
    {
        // res.status(200).send('./join.html', {title: "Join", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
        res.send("i am working!!");
    },

    async postjoin(req,res)
    {
        try{
            const client = await pool.connect()
            await client.query('BEGIN')
            var pwd = await bcrypt.hash(req.body.password, 5);
            // console.log("1");
            await JSON.stringify(client.query('SELECT id FROM "users" WHERE email=$1', [req.body.email], function(err, result) {            
                if(result && result.rows[0]){
                    // console.log('2');
                    req.flash('warning', "This email address is already registered. <a href='/login'>Log in!</a>");
                    // res.send("This email address is already registered.");
                    // res.redirect('/join');
                    
                    res.send("redirect to /join");
                }
                else
                {   
                    // console.log("3");
                    client.query('INSERT INTO "users"(id, name, email, password,contactnumber,deliveryaddress,deliverypostalcode,organisationname,gstnumber,officenumber,companyaddress,companypostalcode) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12)', [uuidv4(), req.body.name, req.body.email, pwd,req.body.contactnumber,req.body.deliveryaddress,req.body.deliverypostalcode,req.body.organisationname,req.body.gstnumber,req.body.officenumber,req.body.companyaddress,req.body.companypostalcode], function(err, result) {
                        if(err){console.log(err);}
                        else 
                        {
                            client.query('COMMIT');
                            console.log(result);
                            req.flash('success','User created.');
                            // res.redirect('/login');
                            res.send("redirect to /login");
                            return;
                        }
                        });
                }
            }));
            client.release();
        } 
        catch(e){throw(e);}
    },

    getaccount(req,res)
    {
        if(req.isAuthenticated()){
        
            res.send("account page will be rendered.");
            // res.render('./account.html', {title: "account", userData: req.user, userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
        }
        else{
            // res.redirect('/login');
            res.send("redirected to login page");
        }
    },

    getlogin(req,res)
    {
        if (req.isAuthenticated()) {
            res.send("redirected to account page");
            // res.redirect('/account');
        }
        else
        {
            res.send("login page will be rendered.");
            // res.render('./login.html', {title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
        }
    },

    passportauth,
    
    postlogin(req,res)
    {
        if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.send("redirected to login");
        // res.redirect('/login');
    },
    
    getlogout(req,res)
    {
        console.log(req.isAuthenticated());
        req.logout();
        console.log(req.isAuthenticated());
        req.flash('success', "Logged out. See you soon!");
        res.send("redirected to login");
        // res.redirect('/login');
    }
}

// PASSPORT-LOCAL STRATEGY
passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, email, password, done) => {
    loginAttempt();
    console.log("using it");
    async function loginAttempt() {
        const client = await pool.connect()
        try{
            await client.query('BEGIN')
            var currentAccountsData = await JSON.stringify(client.query('SELECT * FROM "user" WHERE "email"=$1', [email], function(err, result) {    
                if(err) {
                    return done(err)
                } 
                if(result.rows[0] == null){
                    req.flash('danger', "Oops. Incorrect login details.");
                    console.log("Oops. Incorrect login details.");
                    return done(null, false);
                }
                else{
                    bcrypt.compare(password, result.rows[0].password, function(err, check) {
                        if (err){
                            console.log('Error while checking password');
                            return done();
                        }
                        else if (check){
                            console.log("done");
                            return done(null, [{email: result.rows[0].email, name: result.rows[0].name}]);
                        }
                        else{
                        req.flash('danger', "Oops. Incorrect login details.");
                        return done(null, false);
                        }
                    });
                }
            }))
        }
        catch(e){throw (e);}
    };        
}))
           
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default Authentication;