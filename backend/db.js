const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
})

const createSequence = () => {
    const queryText = 'CREATE SEQUENCE IF NOT EXISTS orderSequence INCREMENT BY 1 START WITH 1';
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

const createOrderTable = () => {
    const queryText =
        `CREATE TABLE IF NOT EXISTS
            orders(
                orderNumber INTEGER DEFAULT NEXTVAL('orderSequence') PRIMARY KEY,
                orderedOn DATE DEFAULT CURRENT_DATE,
                expectedBy DATE,
                status TEXT NOT NULL,
                productId VARCHAR [],
                productName VARCHAR [],
                rate INTEGER [],
                quantity INTEGER [],
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

const dropSequence = () => {
    const queryText = `DROP SEQUENCE IF EXISTS orderSequence`;

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
    createSequence,
    createOrderTable,
    createUserTable,
    createProductTable,
    dropSequence,
    dropUserTable,
    dropOrderTable,
    dropProductTable
};

require('make-runnable');
