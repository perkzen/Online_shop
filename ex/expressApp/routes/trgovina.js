var express = require('express');
var router = express.Router();
const knexfile = require('../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);


const Izdelek = bookshelf.Model.extend({
    tableName: 'izdelki',
    idAttribute: 'id'
});

const Nakup = bookshelf.Model.extend({
    tableName: 'nakupi',
    idAttribute: 'id'
});


router.get('/', async (req, res, next) => {
    try {
        const izdelki = await new Izdelek().fetchAll();
        res.json(izdelki.toJSON());
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/', async (req, res, next) => {
    let kosarica = req.body
    try {
        const novNakup = await new Nakup().save(kosarica);
        res.json({
            status: "added",
            nakup: novNakup
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/objava', async (req, res, next) => {
    try {
        let izdelek = req.body;
        const novIzdelek = await new Izdelek().save(izdelek);
        let vsi = await new Izdelek().fetchAll();
        res.json({status: "added", vsi: vsi});
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await new Izdelek({id: id}).destroy();
        let vsi = await new Izdelek().fetchAll();
        res.json({status: "deleted", vsi: vsi});
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;