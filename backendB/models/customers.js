const sequelize = require('sequelize');
const db = require('../config/database');

const customers = db.define('customers',{
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
    },
    name:{
        type: sequelize.STRING,
        allowNull: false,
    },
})
module.exports = customers;
