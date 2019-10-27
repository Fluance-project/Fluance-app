const express = require('express');
const Source = require('../models/source');
const router =  express.Router();


router.get('/', (req, res) => {
    Source.find(req.query).then(data => res.json(data));
});

router.post('/', (req, res) => {
    let source = new Source();
    source.title = req.body.title;
    source.url = req.body.url;
    source.type = req.body.type;
    source.userId = req.body.userId;
    source.save(function(err){
        if(err){
            res.sendStatus(500);
        }
        res.send(100);
    })
})


module.exports = router;
