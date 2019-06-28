var express = require('express');
var router = express.Router();
const path = require('path');
var db = require('../config/database');
const user = require('../models/user');

/* GET home page. */

db.authenticate().then(()=> console.log('connected'))
  .catch(err => console.log('Error'))


router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.
  console.log("here");
  //console.log(user.findOne());
  // user.findAll().then((cus)=>{
  //   console.log(cus);
  //   //res.sendStatus(200);
  // })
  // .catch(err => console.log(err));
  
  // const customers = [
  //   {id:1, name:"baliga", hobby:"nankari" },
  //   {id:2, name:"nikhil", hobby:"cp"},
  //   {id:3, name:"dipesh", hobby:"colors"}
  // ];
  // res.json(customers);
});

module.exports = router;
