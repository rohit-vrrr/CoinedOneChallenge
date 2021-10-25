require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const controller = require("./modules");

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(controller);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log("Error : ", err.message);
});

// Home Route
app.get('/', (req, res) => {
    res.json({
        message: "CoinedOne Challenge"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
