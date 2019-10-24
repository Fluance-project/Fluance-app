const express = require('express');
const Book = require('../models/book');
const router =  express.Router();
 

router.get('/', (req, res) => { 
    Book.find(req.query).sort({'notation': -1}).limit(10).then(data => res.json(data)).then(data => res.json(data));
});

// trends/


module.exports = router;