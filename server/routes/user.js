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

module.exports = router;
