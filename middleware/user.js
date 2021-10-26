const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const _ = require("lodash");

const User = require("../modules/user/model.js");

let obj = {

    checkExistingUser: (req, res, next) => {

        let name = _.toLower(req.body.name);

        User.UserModel.findOne({ name }, (err, user) => {

            if(err) {
                res.status(400).send(err.message);
            } else {
                if(user) {
                    if(user.name === name) {
                        res.status(409).send({
                            success: false,
                            message: "User Already Exists"
                        });
                    }
                } else {
                    next();
                }
            }
        });
    },

    checkTimeOverlap: (req, res, next) => {

        let date = new Date();
        const [year, month, day] = [ date.getFullYear(), date.getMonth()+1, date.getDate() ];
        let today = `${year}-${month}-${day}`;

        let name = req.params.name;
        
        User.UserModel.findOne({ name }, async (err, user) => {

            if(err) {
                res.status(400).send(err.message);
            } else {

                if(user) {
                    await user.workDays.map((workDay) => {
                        
                        let storedStartTime = `${today} ${workDay.from}`;
                        let storedEndTime = `${today} ${workDay.to}`;

                        let selectedStartTime = `${today} ${req.body.workDays.from}`;
                        let selectedEndTime = `${today} ${req.body.workDays.to}`;

                        const range1 = moment.range(storedStartTime, storedEndTime);
                        const range2 = moment.range(selectedStartTime, selectedEndTime);

                        if(range1.overlaps(range2)) {

                            const result = workDay.daysActive.filter(item => req.body.workDays.daysActive.includes(item));
                            if(result.length === 0) {
                                return;
                            } else {
                                res.status(409).send({
                                    success: false,
                                    message: "Selected time is overlapping with existing work time"
                                });
                                throw new Error("Conflict");
                            }
                        }
                    });

                    next();
                } else {
                    res.status(400).send({
                        success: false,
                        message: "Something went wrong"
                    });
                }
            }
        })
    },

    checkWorkTimeLimit: (req, res, next) => {

        let name = req.params.name;
        const workDaysLimit = 5;

        User.UserModel.findOne({ name }, async (err, user) => {

            if(err) {
                res.status(400).send(err.message);
            } else {

                if(user) {

                    if(user.workDays.length == workDaysLimit) {
                        res.status(400).send({
                            success: false,
                            message: `Work time maximum limit reached (max ${workDaysLimit} entires)`
                        });
                        throw new Error("Work Time Max Limit Reached");
                    } else {
                        next();
                    }
                }
            }
        });
    }
}

module.exports = obj;
