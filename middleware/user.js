const User = require("../modules/user/model.js");
const _ = require("lodash");

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
    }
}

module.exports = obj;
