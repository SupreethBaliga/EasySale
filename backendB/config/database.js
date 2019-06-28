var pg =require('pg');
const sequelize = require('sequelize');
module.exports = new sequelize('my-database','user1','mypassword',{
  host : 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
