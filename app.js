
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const app = express();

const mul = require('./middleware/multerSetup.js')

const authRouter = require('./router/authRouter.js');
const userRouter = require('./router/userRouter.js');
const genRouter = require('./router/genRouter.js');

dotenv.config();

const PORT = process.env.PORT || 8000;

/* Bodyparser */
app.use(bodyParser.json())

/* CORS */
app.use(cors())

/* Setting up multer */
app.use(
    multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 50*1024*1024      // 50MB size of file is allowed
        }
    }).single('file'));

/* Application routes */
app.use('/auth', authRouter);       // Authentication routes

app.use('/user', userRouter);       // User action routes

app.use('/gen/user', genRouter);    // General action routes

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