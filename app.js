const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database)
});

const app = express();

// port number
const port = process.env.PORT || 3000;

const users = require('./routes/users');
const attraction = require('./routes/newAtt');
const rating = require('./routes/ratings');
const reviews = require('./routes/reviews');



// app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({
    "origin": ["*","http://localhost:4200"],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/attraction', attraction);
app.use('/rating', rating);
app.use('/review', reviews);

app.get('/', (req, res) => {
    res.send("Invalid Endpoint")
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(port, () => {
    console.log("Server started on port " + port)
});
