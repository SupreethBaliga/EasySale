import db from '../db';
import uuidv4 from 'uuid/v4';
let auth = require('./Authentication');

const Cart = {
    async create(req, res) {
        let data = auth.authuser(req);
        if(data !== null)
        {
            const text = `INSERT INTO
            cart(cartid, user_id, name, id, image, rate, step, quantity)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`;
            const values = [
                uuidv4(),
                req.body.user_id,
                req.body.name,
                req.body.id,
                req.body.image,
                req.body.rate,
                req.body.step,
                req.body.quantity
            ];

            try {
                const { rows } = await db.query(text, values);
                return res.status(201).send(rows[0]);
            } catch(error) {
                return res.status(400).send(error);
            }
        }
        else
        {
            res.status(400).send({'message' : 'Favourites cannot be created.'});
        }
    },

    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM cart';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    
    async getOneUser(req, res) {
        let data = auth.authuser(req);
        if(data !== null)
        {
            const text = `SELECT * FROM cart WHERE user_id = $1`;
            try {
                const { rows, rowCount } = await db.query(text, [req.params.user_id]);
                if (!rows[0]) {
                    return res.status(404).send({'message': 'cart list not found for this user'});
                }
                return res.status(200).send({ rows, rowCount });
            } catch(error) {
                return res.status(400).send(error)
            }
        }
        else
        {
            res.status(400).send({'message' : 'Favourites cannot be created.'});
        }
    },

    async update(req, res) {
        let data = auth.authuser(req);
        if(data !== null)
        {
            const findOneQuery = 'SELECT * FROM cart WHERE user_id = $1 AND id = $2';
            const updateOneQuery =`UPDATE cart
                SET quantity=$1
                WHERE user_id=$2 and id=$3 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.user_id, req.params.id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'product not found in cart'});
                }
                const values = [
                    req.body.quantity || rows[0].quantity,
                    req.params.user_id,
                    req.params.id
                ];
                const response = await db.query(updateOneQuery, values);
                return res.status(200).send(response.rows[0]);
            } catch(err) {
                return res.status(400).send(err);
            }
        }
        else
        {
            res.status(400).send({'message' : 'Favourites cannot be created.'});
        }
    },

    async deleteProduct(req, res) {
        let data = auth.authuser(req);
        if(data !== null)
        {
            const deleteQuery = 'DELETE FROM cart WHERE user_id=$1 AND id=$2 returning *';
            try {
                const { rows } = await db.query(deleteQuery, [req.params.user_id, req.params.id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'product not found in cart'});
                }
                return res.status(204).send({ 'message': 'deleted' });
            } catch(error) {
                return res.status(400).send(error);
            }
        }
        else
        {
            res.status(400).send({'message' : 'Favourites cannot be created.'});
        }
    },

    async deleteCart(req, res) {
        let data = auth.authuser(req);
        if(data !== null)
        {
            const deleteQuery = 'DELETE FROM cart WHERE user_id=$1 returning *';
            try {
                const { rows, rowCount } = await db.query(deleteQuery, [req.params.user_id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'user has no cart'});
                }
                return res.status(204).send({ 'message': 'deleted' });
            } catch(error) {
                return res.status(400).send(error);
            }
        }
        else
        {
            res.status(400).send({'message' : 'Favourites cannot be created.'});
        }
    },
}

export default Cart;
