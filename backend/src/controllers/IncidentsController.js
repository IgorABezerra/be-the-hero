const connections = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connections('incidents').count();
        
        const incidents = await connections('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        res.header('X-TOTAL-COUNT', count['count(*)']);

        return res.json(incidents);
    },

    async create(req, res) {
        try {
            const { title, description, value } = req.body;
            const ong_id = req.headers.authorization;

            const id = await connections('incidents').insert({ title, description, value, ong_id });

            res.status(200).json({ id });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        const ong_id = req.headers.authorization;

        const incident = await connections('incidents').where('id', id).select('ong_id').first();

        if (ong_id != incident.ong_id) {
            return res.status(401).json({ error: 'Operation not permitted'});
        }

        await connections('incidents').where('id', id).delete();

        return res.status(204).send('Boa moleque');
    }
}
