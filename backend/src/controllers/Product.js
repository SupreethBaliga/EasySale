import db from '../db';
let auth = require('./Authentication');

const Product = {
    async create(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com") {
            const text = `INSERT INTO
            products(name, id, image, description, rate, step)
            VALUES($1, $2, $3, $4, $5, $6)
            returning *`;
            const values = [
                req.body.name,
                req.body.id,
                req.body.image,
                req.body.description,
                req.body.rate,
                req.body.step
            ];
            try {
                const { rows } = await db.query(text, values);
                return res.status(201).send(rows[0]);
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message' : 'Product cannot be created.'});
        }    
    },
    
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM products';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    
    async getOne(req, res) {
        const text = 'SELECT * FROM products WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'product not found'});
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    
    async update(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com") {
            const findOneQuery = 'SELECT * FROM products WHERE id = $1';
            const updateOneQuery =`UPDATE products
                SET rate=$1,step=$2
                WHERE id=$3 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'Product not found'});
                }
                const values = [
                    req.body.rate || rows[0].rate,
                    req.body.step || rows[0].step,
                    req.params.id
                ];
                const response = await db.query(updateOneQuery, values);
                return res.status(200).send(response.rows[0]);
            } catch(err) {
                return res.status(400).send(err);
            }
        } else {
            res.status(400).send({'message' : 'Product cannot be updated.'});
        }
    },
    
    async delete(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.email === "admin@gmail.com") {
            const deleteQuery = 'DELETE FROM products WHERE id=$1 returning *';
            try {
                const { rows } = await db.query(deleteQuery, [req.params.id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'Product not found'});
                }
                return res.status(204).send({ 'message': 'Deleted' });
            } catch(error) {
                return res.status(400).send(error);
            }
        } else {
            res.status(400).send({'message' : 'Product cannot be deleted.'});
        }
    }
}

export default Product;
