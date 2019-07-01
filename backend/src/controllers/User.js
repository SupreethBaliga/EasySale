import uuidv4 from 'uuid/v4';
import db from '../db';

const Order = {
    async create(req, res) {
        const text = `INSERT INTO
            users(id, password, name, email, contactNumber, deliveryAddress, deliveryPostalCode, organisationName, GSTNumber, officeNumber, companyAddress, companyPostalCode)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            returning *`;
        const values = [
            uuidv4(),
            req.body.password,
            req.body.name,
            req.body.email,
            req.body.contactNumber,
            req.body.deliveryAddress,
            req.body.deliveryPostalCode,
            req.body.organisationName,
            req.body.GSTNumber,
            req.body.officeNumber,
            req.body.companyAddress,
            req.body.companyPostalCode
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    
    async getOne(req, res) {
        const text = 'SELECT * FROM users WHERE id = $1';
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).send({'message': 'user not found'});
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    
    async update(req, res) {
        const findOneQuery = 'SELECT * FROM users WHERE id = $1';
        const updateOneQuery =`UPDATE users
            SET password=$1,name=$2,email=$3,contactNumber=$4,deliveryAddress=$5,deliveryPostalCode=$6,organisationName=$7,GSTNumber=$8,officeNumber=$9,companyAddress=$10,companyPostalCode=$11
            WHERE id=$12 returning *`;
        try {
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if(!rows[0]) {
                return res.status(404).send({'message': 'user not found'});
            }
            const values = [
                req.body.password || rows[0].password,
                req.body.name || rows[0].name,
                req.body.email || rows[0].email,
                req.body.contactNumber || rows[0].contactNumber,
                req.body.deliveryAddress || rows[0].deliveryAddress,
                req.body.deliveryPostalCode || rows[0].deliveryPostalCode,
                req.body.organisationName || rows[0].organisationName,
                req.body.GSTNumber || rows[0].GSTNumber,
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
    },
}

export default Order;
