
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config()

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json())

app.use('/',(req, res, next) => {
    return res.status(200).json({
        msg: "Hello from rucksack's first api"
    })
})

app.use((err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal error";
    return res.status(errStatus).json({
        errorMessage
    })
})

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error:", err);
    }

    console.log(`Server is running on localhost:${PORT}`)
})