const express = require('express');
const router =  express.Router();
 

router.get('/', (req, res) => { 
  res.json(true)
});

router.get('/version', (req, res) => { 
    res.json({version : 0.1})
  });
  

// trends/


module.exports = router;