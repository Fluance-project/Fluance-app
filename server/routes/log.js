const express = require('express');
const Task = require('../models/log');
const router =  express.Router();
 

router.get('/', (req, res) => { 
    Task.find(req.query).sort({'notation': -1}).limit(10).then(data => res.json(data)).then(data => res.json(data));
});

// trends/


module.exports = router;