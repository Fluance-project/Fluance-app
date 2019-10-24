const express = require('express');
const Board = require('../models/board');
const router =  express.Router();
 

router.get('/', (req, res) => { 
    Board.find(req.query).sort({'notation': -1}).limit(10).then(data => res.json(data)).then(data => res.json(data));
});

// trends/


module.exports = router;