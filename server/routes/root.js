const express = require('express');
const router =  express.Router();
const path = require('path');
const createToken = require("../lib/auth").createToken;
const User = require("../models/user");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../static/index.html'));
});

router.post("/login", (req, res) => {
    User.login(req.body.email, req.body.password)
        .then(user => {
            const token = createToken({
                firstName: user.firstname
            });
            res.status(201).send({ token,user });
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(JSON.stringify(error));
        });

    console.log("Login...");
});

router.post("/register", (req, res) => {
    const user = new User(req.body);
    user.register()
        .then(data => res.status(201).send(data))
        .catch(error => {
            console.log(error);
            if (error.name === "ValidationError") {
                res.status(400).json(error.errors);
            } else {
                res.sendStatus(500);
            }
        });
});

module.exports = router;