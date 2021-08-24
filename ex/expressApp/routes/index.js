var express = require('express');
var router = express.Router();
const uporabniki = require('../data/Uporabniki');


//prijava
router.post('/', (req, res, next) => {
    const noviUporabnik = req.body;
    for (let uporabnik of uporabniki) {
        if (noviUporabnik.ime === uporabnik.ime && noviUporabnik.geslo === uporabnik.geslo) {
            res.json({id: uporabnik.id});
        }
    }
});


module.exports = router;
