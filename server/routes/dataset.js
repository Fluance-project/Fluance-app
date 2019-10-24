const express = require('express');
const Dataset = require('../models/dataset');
const router =  express.Router();
 

router.get('/', (req, res) => { 
    BDatasetook.find(req.query).sort({'notation': -1}).limit(10).then(data => res.json(data)).then(data => res.json(data));
});

// trends/


module.exports = router;