const express = require("express");
const _ = require("lodash");
const User = require("./model.js");
const userMiddleware = require("../../middleware/user.js");

const router = express.Router();

/**
 * User registration
 * Middleware - Checking for existing users with same name
 */
router.post('/userRegister', userMiddleware.checkExistingUser, (req, res) => {

    let obj = {
        name: _.toLower(req.body.name)
    };
    let model = new User.UserModel(obj);

    model.save((err, user) => {

        if(err) {
            res.send(err.message);
        } else {
            res.status(200).json({
                success: true,
                id: user._id,
                message: "User Registered Successfully"
            });
        }
    });
});

/**
 * Add work time
 * Middleware1 - Checking for time overlaps w.r.t. day & time
 * Middleware2 - Check number of entries (to not exceed 5)
 */
router.put('/addWorkTime/:name',
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

/**
 * Add blocked apps
 */
router.put('/blockApps/:name', (req, res) => {

    let name = req.params.name;

    User.UserModel.findOneAndUpdate(
        { name },
        { blockedApps: req.body.blockedApps }, (err, user) => {

            if(err) {
                res.status(400).send(err.message);
            } else {

                if(user) {
                    res.status(200).send({
                        success: true,
                        message: "Blocked Apps Added Successfully"
                    });
                } else {
                    res.status(404).send({
                        success: false,
                        message: "User Doesn't Exist"
                    });
                }
            }
        }
    );
});

/**
 * Add limited Apps
 */
router.put('/limitedApps/:name', (req, res) => {

    let name = req.params.name;

    User.UserModel.findOneAndUpdate(
        { name },
        { $push: { limitedApps: req.body.limitedApps } }, (err, data) => {

            if(err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send({
                    success: true,
                    message: "Limited Apps Added Successfully"
                })
            }
        }
    );
});

/**
 * Fetch all the user details
 */
router.get('/:name/getAll', (req, res) => {

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
                            workDays: user.workDays,
                            blockedApps: user.blockedApps,
                            limitedApps: user.limitedApps
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
 * Fetch user work days
 */
 router.get('/:name/getWorkDays', (req, res) => {

    let name = _.toLower(req.params.name);

    User.UserModel.findOne({ name }, (err, user) => {

        if(err) {
            res.status(400).send(err.message);
        } else {

            if(user) {
                if(user.name === name) {
                    User.UserModel.find({ name }, { workDays: 1, _id: 0 }, (e, data) => {
                        if(e) {
                            res.status(400).send(e.message);
                        } else {
                            data.map((item) => {
                                
                                res.status(200).send({
                                    workDays: item.workDays
                                });
                            });
                        }
                    });
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "User Doesn't Exist"
                });
            }
        }
    });
});

/**
 * Fetch user blocked apps
 */
router.get('/:name/getBlockedApps', (req, res) => {

    let name = _.toLower(req.params.name);

    User.UserModel.findOne({ name }, (err, user) => {

        if(err) {
            res.status(400).send(err.message);
        } else {

            if(user) {
                if(user.name === name) {
                    User.UserModel.find({ name }, { blockedApps: 1, _id: 0 }, (e, data) => {
                        if(e) {
                            res.status(400).send(e.message);
                        } else {
                            data.map((item) => {
                                
                                res.status(200).send({
                                    blockedApps: item.blockedApps
                                });
                            });
                        }
                    });
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "User Doesn't Exist"
                });
            }
        }
    });
});

/**
 * Fetch user limited apps 
 */
router.get('/:name/getLimitedApps', (req, res) => {

    let name = _.toLower(req.params.name);

    User.UserModel.findOne({ name }, (err, user) => {

        if(err) {
            res.status(400).send(err.message);
        } else {

            if(user) {
                if(user.name === name) {
                    User.UserModel.find({ name }, { limitedApps: 1, _id: 0 }, (e, data) => {
                        if(e) {
                            res.status(400).send(e.message);
                        } else {
                            data.map((item) => {
                                
                                res.status(200).send({
                                    limitedApps: item.limitedApps
                                });
                            });
                        }
                    });
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: "User Doesn't Exist"
                });
            }
        }
    });
});

module.exports = router;
