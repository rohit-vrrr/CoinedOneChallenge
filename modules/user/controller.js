const express = require("express");
const _ = require("lodash");
const User = require("./model.js");
const userMiddleware = require("../../middleware/user.js");

const router = express.Router();

router.post('/addWorkTime', userMiddleware.checkExistingUser, (req, res) => {

    let obj = {
        "name": _.toLower(req.body.name),
        "activeDays": req.body.activeDays,
        "from": req.body.from,
        "to": req.body.to
    };
    let model = new User.UserModel(obj);

    model.save((err, user) => {

        if(err) {
            res.send(err.message);
        } else {
            res.status(200).json({
                success: true,
                id: user._id,
                message: "Work Time Added Successfully"
            });
        }
    });
});

router.get('/:name', (req, res) => {

    let name = _.toLower(req.params.name);

    User.UserModel.findOne({ name }, (err, user) => {

        if(err) {
            res.status(400).send(err.message);
        } else {

            if(user) {
                if(user.name === name) {
                    res.status(200).send({
                        success: true,
                        userDetails: {
                            name: _.capitalize(user.name),
                            activeDays: user.activeDays,
                            from: user.from,
                            to: user.to
                        }
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "User Doesn't Exist"
                    })
                }
            }
        }
    })
});

module.exports = router;
