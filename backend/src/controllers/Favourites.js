import db from '../db';
import uuidv4 from 'uuid/v4';
let auth = require('./Authentication');

const Favourite = {
    async create(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.body.user_id) {
            const text = `INSERT INTO
            favourites(favid, user_id, product_id)
            VALUES($1, $2, $3)
            returning *`;
            const values = [
                uuidv4(),
                req.body.user_id,
                req.body.product_id,
            ];

            try {
                const { rows } = await db.query(text, values);
                return res.status(201).send(rows[0]);
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message' : 'Favourites cannot be created.'});
        }
    },

    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM favourites';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    
    async getOneUser(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.params.user_id) {
            const text = `SELECT array_agg(DISTINCT product_id) AS product_id FROM favourites WHERE user_id = $1`;
            try {
                const { rows } = await db.query(text, [req.params.user_id]);
                if (!rows[0]) {
                    return res.status(404).send({'message': 'Favourites not found for this user'});
                }
                return res.status(200).send(rows[0]);
            } catch(error) {
                return res.status(400).send(error)
            }
        } else {
            res.status(400).send({'message' : 'Favourites cannot be shown for this user.'});
        }
    },

    async delete(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.params.user_id) {
            const deleteQuery = 'DELETE FROM favourites WHERE user_id=$1 AND product_id=$2 returning *';
            try {
                const { rows } = await db.query(deleteQuery, [req.params.user_id, req.params.product_id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'Favourite not found'});
                }
                return res.status(204).send({ 'message': 'Deleted' });
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message' : 'Favourites cannot be deleted for this user.'});
        }
    }
}

export default Favourite;
