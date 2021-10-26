const express = require("express");
const _ = require("lodash");
const User = require("./model.js");
const userMiddleware = require("../../middleware/user.js");

const router = express.Router();

/**
 * Add new user work time
 * Middleware - Checking for existing users with same name
 */
router.post('/addWorkTime', userMiddleware.checkExistingUser, (req, res) => {

    let obj = {
        name: _.toLower(req.body.name),
        workDays: [{
            daysActive: req.body.workDays.daysActive,
            from: req.body.workDays.from,
            to: req.body.workDays.to
        }]
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

/**
 * Fetching all the users
 */
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
                            workDays: user.workDays
                        }
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "User Doesn't Exist"
                    });
                }
            }
        }
    })
});

/**
 * Adding more work time
 * Middleware1 - Checking for time overlaps w.r.t. day & time
 * Middleware2 - Check number of entries (to not exceed 5)
 */
router.put('/updateWorkTime/:name',
    userMiddleware.checkTimeOverlap,
    userMiddleware.checkWorkTimeLimit,
    (req, res) => {

    let name = req.params.name;

    User.UserModel.findOneAndUpdate(
        { name },
        { $push: { workDays: req.body.workDays } }, (err, data) => {
            
            if(err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send({
                    success: true,
                    message: "User Work Time Updated"
                });
            }
    });
});

module.exports = router;
