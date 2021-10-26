const mongoose = require("mongoose");

const user = {
    name: String,
    workDays: [
        {
            _id: false,
            daysActive: {
                type: [String],
                enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
                required: true
            },
            from: String,
            to: String
        }
    ],
    blockedApps: { type:[String] },
    limitedApps: {
        weekdays: {
            app: { type: String },
            limit: { type: String }
        },
        weekends: {
            app: { type: String },
            limit: { type: String }
        }
    }

}

const userSchema = new mongoose.Schema(user, { versionKey: false, timestamps: true });

module.exports = {
    UserModel: mongoose.model("user", userSchema)
};
