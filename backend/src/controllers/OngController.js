const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const ongs = await connection('ongs').select('*');

            res.json(ongs);
        } catch (err) {
            res.status(400).json({err})
        }
    },
    async create(req, res) {
        try {
            const { name, email, whatsapp, city, uf } = req.body;
        
            const id = crypto.randomBytes(4).toString('HEX');
        
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            });
        
            return res.json({ id });
        } catch (err) {
            return res.status(400).json({
                err
            })
        }
    }
}