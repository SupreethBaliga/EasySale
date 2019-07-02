const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
})

const createOrderTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            orders(
                id UUID PRIMARY KEY,
                orderNumber SERIAL,
                orderedOn DATE NOT NULL DEFAULT CURRENT_DATE,
                expectedBy DATE,
                status TEXT NOT NULL,
                productId VARCHAR NOT NULL [],
                productName VARCHAR NOT NULL [],
                rate INTEGER NOT NULL [],
                quantity INTEGER NOT NULL [],
                totalAmount INTEGER NOT NULL,
                user_id UUID NOT NULL,
                name VARCHAR,
                email VARCHAR,
                contactNumber VARCHAR,
                deliveryAddress VARCHAR,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const createUserTable = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            users(
                id UUID PRIMARY KEY,
                password VARCHAR NOT NULL,
                name VARCHAR NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                contactNumber VARCHAR(10) NOT NULL,
                deliveryAddress VARCHAR NOT NULL,
                deliveryPostalCode VARCHAR NOT NULL,
                organisationName VARCHAR,
                GSTNumber VARCHAR(15),
                officeNumber VARCHAR,
                companyAddress VARCHAR,
                companyPostalCode VARCHAR
            )`;
    
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const createProductTable = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            products(
                name VARCHAR NOT NULL,
                id VARCHAR PRIMARY KEY,
                image VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                rate INTEGER NOT NULL,
                step INTEGER NOT NULL
            )`;
    
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropOrderTable = () => {
    const queryText = `DROP TABLE IF EXISTS orders`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropUserTable = () => {
    const queryText = `DROP TABLE IF EXISTS users`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropProductTable = () => {
    const queryText = `DROP TABLE IF EXISTS products`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

module.exports = {
    createOrderTable,
    createUserTable,
    createProductTable,
    dropUserTable,
    dropOrderTable,
    dropProductTable
};

require('make-runnable');
