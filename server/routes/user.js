const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => {
    User.find(req.query).then(data => res.json(data));
});

// user/1
router.get("/:id", (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
            if (error.name == "CastError") {
                res.status(422).json({ message: "Invalid id" });
            } else {
                res.sendStatus(500);
            }
        });
});

// user/1
router.put("/:id", (req, res) => {
    const user = new User({ _id: req.params.id });
    user.populate(res.body);
    user.save();
});
/*
// user/1/avis
router.get("/:id/avis/", (req, res) => {
    const query = User.findById(req.params.id).populate('avis');
    query.exec((err, user) => {
        return res.status(200).json({ user, avis: user.avis })
    })
});

// user/1/avis
router.post("/:id/avis/", (req, res) => {
    const avis = new Avis(req.body);
    avis.save()
        .then(data => res.status(201).send(data))
        .catch(error => {
            if(error.name === 'ValidationError'){
                res.status(400).json(error.errors);
            } else {
                res.sendStatus(500);
            }
        })
});
*/

module.exports = router;
