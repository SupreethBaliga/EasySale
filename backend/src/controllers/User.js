import uuidv4 from 'uuid/v4';
import db from '../db';
let auth = require('./Authentication');

const User = {
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM users';
        try {
            const { rows, rowCount } = await db.query(findAllQuery);
            return res.status(200).send({ rows, rowCount });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    
    async getOne(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.params.id) {
            const text = 'SELECT * FROM users WHERE id = $1';
            try {
                const { rows } = await db.query(text, [req.params.id]);
                if (!rows[0]) {
                    return res.status(404).send({'message': 'User not found'});
                }
                return res.status(200).send(rows[0]);
            } catch(error) {
                return res.status(400).send(error)
            }
        } else {
            res.status(400).send({'message' : 'Cannot access this user details.'});
        }
    },
    
    async update(req, res) {
        let data = auth.authuser(req);
        if(data != null && data.id === req.params.id) {
            const findOneQuery = 'SELECT * FROM users WHERE id = $1';
            const updateOneQuery =`UPDATE users
                SET name=$1,contactNumber=$2,deliveryAddress=$3,deliveryPostalCode=$4,officeNumber=$5,companyAddress=$6,companyPostalCode=$7
                WHERE id=$8 returning *`;
            try {
                const { rows } = await db.query(findOneQuery, [req.params.id]);
                if(!rows[0]) {
                    return res.status(404).send({'message': 'user not found'});
                }
                const values = [
                    req.body.name || rows[0].name,
                    req.body.contactNumber || rows[0].contactNumber,
                    req.body.deliveryAddress || rows[0].deliveryAddress,
                    req.body.deliveryPostalCode || rows[0].deliveryPostalCode,
                    req.body.officeNumber || rows[0].officeNumber,
                    req.body.companyAddress || rows[0].companyAddress,
                    req.body.companyPostalCode || rows[0].companyPostalCode,
                    req.params.id
                ];
                const response = await db.query(updateOneQuery, values);
                return res.status(200).send(response.rows[0]);
            } catch(err) {
                return res.status(400).send(err);
            }
        } else {
            res.status(400).send({'message' : 'User cannot be updated.'});
        }
    },
}

export default User;
