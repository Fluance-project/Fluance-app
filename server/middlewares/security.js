const verifyToken = require('../services/auth').verifyToken;

const verify = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.sendStatus(401);
    }else {
        verifyToken(authHeader.replace('Bearer ', '')).then(user => {
            req.user = user;
            next();
        }).catch(err => { console.log(err);res.status(401).send("JWT TOKEN invalid")})
    }
}


module.exports = verify;
