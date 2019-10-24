const express = require('express');
const Analyse = require('../models/analyse');
const router =  express.Router();
 

router.get('/', (req, res) => { 
    Analyse.find(req.query).sort({'notation': -1}).limit(10).then(data => res.json(data)).then(data => res.json(data));
});

// trends/


module.exports = router;