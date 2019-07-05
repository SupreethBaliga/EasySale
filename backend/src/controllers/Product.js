import db from '../db';

const Product = {
    async create(req, res) {
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
        const findOneQuery = 'SELECT * FROM products WHERE id = $1';
        const updateOneQuery =`UPDATE products
            SET rate=$1,step=$2
            WHERE id=$3 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'product not found'});
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
    },
    
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM products WHERE id=$1 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'product not found'});
            }
            return res.status(204).send({ 'message': 'deleted' });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

export default Product;
