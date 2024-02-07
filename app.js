
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const authRouter = require('./router/authRouter.js');

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json())

app.use(cors())

/* Application routes */
app.use('/auth', authRouter);

app.use('/',(req, res, next) => {
    return res.status(200).json({
        msg: "Hello from rucksack's first api"
    })
})

/* Error handling */
app.use((err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal error";
    return res.status(errStatus).json({
        errorMessage
    })
})

/* running server */
mongoose.connect(
    `${process.env.DATABASE_URL}`
).then(() => {
    app.listen(PORT, (err) => {
        if(err) {
            console.log("Error:", err);
        }
        console.log("Connected to DB")
        console.log(`Server is running on localhost:${PORT}`)
    })
}).catch(err => {
    console.log("Error:", err);
})