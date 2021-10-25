const mongoose = require("mongoose");

const user = {
    name: String,
    workDays: [
        {
            daysActive: {
                type: [String],
                enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
            },
            from: String,
            to: String
        }
    ]
}

const userSchema = new mongoose.Schema(user, { versionKey: false, timestamps: true });

module.exports = {
    UserModel: mongoose.model("user", userSchema)
};
