import db from '../db';
let auth = require('./Authentication');

const Order = {
    async create(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.body.user_id) {
            const text = `INSERT INTO
            orders(orderedOn, status, id, name, rate, quantity, totalAmount, user_id, user_name)
            SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9
            FROM cart WHERE user_id=$8 GROUP BY user_id
            returning *`;

            var username;
            if(data.org !== "") username = data.org;
            else username = data.name;

            const values = [
                req.body.orderedOn,
                req.body.status,
                req.body.id,
                req.body.name,
                req.body.rate,
                req.body.quantity,
                req.body.totalAmount,
                req.body.user_id,
                username
            ];
            try {
                const { rows } = await db.query(text, values);
                return res.status(201).send(rows[0]);
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message' : 'Order cannot be created for this user.'});
        }
    },

    async getAll(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com"){
            const findAllQuery = `SELECT * FROM orders WHERE status!='Pending' and status!='Rejected' ORDER BY orderNumber DESC`;
            try {
                const { rows, rowCount } = await db.query(findAllQuery);
                return res.status(200).send({ rows, rowCount });
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message' : 'All orders cannot be seen.'});
        }
    },

    async getAllPending(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com") {
            const findAllQuery = `SELECT * FROM orders WHERE status='Pending' ORDER BY orderNumber DESC`;
            try {
                const { rows, rowCount } = await db.query(findAllQuery);
                return res.status(200).send({ rows, rowCount });
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            window.location.assign('//easysale.live/')
            res.status(400).send({'message' : 'All orders cannot be seen.'});
        }
    },

    async getOneUser(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.params.user_id){
            const findAllQuery = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY orderNumber DESC';
            try {
                const { rows, rowCount } = await db.query(findAllQuery, [req.params.user_id]);
                return res.status(200).send({ rows, rowCount });
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message': 'Orders for this user cannot be seen.'});
        }
    },
    
    async getOne(req, res) {
        let data = auth.authuser(req);
        if(data != null){
            const text = 'SELECT * FROM orders WHERE orderNumber = $1';
            try {
                const { rows } = await db.query(text, [req.params.orderNumber]);
                if (!rows[0]) {
                    return res.status(404).send({'message': 'order not found'});
                }
                if(rows[0].user_id === data.id || data.email === "admin@gmail.com") return res.status(200).send(rows[0]);
                else return res.status(400).send({'message' : 'Order details cannot be seen for this user.'});
            } catch(error) {
                return res.status(400).send(error)
            }
        } else {
            res.status(400).send({'message' : 'Order details cannot be seen.'});
        }
    },
    
    async updateStatus(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com") {
            const findOneQuery = 'SELECT * FROM orders WHERE orderNumber = $1';
            const updateOneQuery =`UPDATE orders
                SET status=$1
                WHERE orderNumber=$2 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.orderNumber]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'Order not found'});
                }
                const values = [
                    req.body.status || rows[0].status,
                    req.params.orderNumber
                ];
                const response = await db.query(updateOneQuery, values);
                return res.status(200).send(response.rows[0]);
            } catch(err) {
                return res.status(400).send(err);
            }
        } else {
            res.status(400).send({'message' : 'Order status cannot be updated.'});
        }
    },

    async updateDate(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com") {
            const findOneQuery = 'SELECT * FROM orders WHERE orderNumber = $1';
            const updateOneQuery =`UPDATE orders
                SET expectedBy=$1, status=$2
                WHERE orderNumber=$3 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.orderNumber]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'Order not found'});
                }
                const values = [
                    req.body.expectedBy || rows[0].expectedBy,
                    req.body.status || rows[0].status,
                    req.params.orderNumber
                ];
                const response = await db.query(updateOneQuery, values);
                return res.status(200).send(response.rows[0]);
            } catch(err) {
                return res.status(400).send(err);
            }
        } else {
            res.status(400).send({'message' : 'Order expected date cannot be updated.'});
        }
    },
}

export default Order;
