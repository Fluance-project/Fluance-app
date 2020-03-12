const express = require('express');
const router = express.Router();
const path = require('path');
const createToken = require("../services/auth").createToken;
const User = require("../models/user");

const Info = require('../services/info');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../static/index.html'));
});

router.post("/login", (req, res) => {
    User.login(req.body.email, req.body.password)
        .then(user => {
            const token = createToken({
                firstName: user.firstname
            });
            res.status(201).send({ token, user });
            console.log("=> [LOGIN] Token send for " + user.id);
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(JSON.stringify(error));
        });

});

router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.register()
        .then(data => {
            res.status(201).send(data)
            console.log("=> [SIGNIN] User created "+ data.id);
        })
        .catch(error => {
            if (error.name === "ValidationError") {
                res.status(400).json(error.errors);
            } else {
                res.sendStatus(500);
            }
        });
});

router.get("/info", (req, res) => {
    Info.getHostInfo().then((data) =>{
        res.status(201).send(data)
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

module.exports = router;