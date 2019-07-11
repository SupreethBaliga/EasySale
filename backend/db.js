const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
})

const exportUser = () => {
    const queryText = `COPY users to '/tmp/userdata.csv' DELIMITER ',' CSV HEADER`;
    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const createSequence = () => {
    const queryText = 'CREATE SEQUENCE IF NOT EXISTS orderSequence INCREMENT BY 1 START WITH 1';
    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
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
                orderedOn VARCHAR NOT NULL,
                expectedBy VARCHAR,
                status TEXT NOT NULL,
                id VARCHAR [],
                name VARCHAR [],
                rate INTEGER [],
                quantity INTEGER [],
                totalAmount INTEGER NOT NULL,
                user_id UUID NOT NULL,
                user_name VARCHAR NOT NUll,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
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
            console.log(res.command);
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
                image VARCHAR,
                description VARCHAR NOT NULL,
                rate REAL NOT NULL,
                step INTEGER NOT NULL
            )`;
    
    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const createFavouritesTable = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            favourites(
                favid UUID PRIMARY KEY,
                user_id UUID NOT NULL,
                product_id VARCHAR NOT NULL,
                UNIQUE ( user_id, product_id ),
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
            )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const createCartTable = () => {
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            cart(
                cartid UUID PRIMARY KEY,
                user_id UUID NOT NULL,
                name VARCHAR NOT NULL,
                id VARCHAR NOT NULL,
                image VARCHAR NOT NULL,
                rate INTEGER NOT NULL,
                step INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                UNIQUE ( user_id, id ),
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )`;

    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
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
            console.log(res.command);
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
            console.log(res.command);
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
            console.log(res.command);
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
            console.log(res.command);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropFavouritesTable = () => {
    const queryText = `DROP TABLE IF EXISTS favourites`;

    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

const dropCartTable = () => {
    const queryText = `DROP TABLE IF EXISTS cart`;

    pool.query(queryText)
        .then((res) => {
            console.log(res.command);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

module.exports = {
    exportUser,
    createSequence,
    createOrderTable,
    createUserTable,
    createProductTable,
    createFavouritesTable,
    createCartTable,
    dropSequence,
    dropUserTable,
    dropOrderTable,
    dropProductTable,
    dropFavouritesTable,
    dropCartTable
};

require('make-runnable');
