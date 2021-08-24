var express = require('express');
var router = express.Router();
const knexfile = require('../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const Uporabnik = bookshelf.Model.extend({
    tableName: 'uporabniki',
    idAttribute: 'id',

})

//prijava z bazo
router.post('/', async (req, res, next) => {
    try {
        let loginUporabnik = req.body;
        const bazaUporabnik = await new Uporabnik().where('ime', loginUporabnik.ime).where('geslo', loginUporabnik.geslo).fetch();

        if (bazaUporabnik) {
            res.json({status: "login", id: bazaUporabnik.id, role: bazaUporabnik.attributes.role});
        }
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;