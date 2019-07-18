const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        access: req.body.access,
        password: req.body.password,
        telephoneNo: req.body.telephoneNo,
        mobileNo: req.body.mobileNo,
        address: req.body.address
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            res.json({success: false, msg: 'Failed to register user: ' + err});
        } else {
            res.json({success: true, msg: 'User successfully registered!'});
        }
    });
});

router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (error, user) => {
        if (error) throw error;

        if (!user) {
            return res.json({success: false, msg: "User not found"})
        }

        User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) {
                return res.json({success: false, msg: 'An error occurred. Error: ' + error});
            }

            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });

                return res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        access:user.access,
                    }
                });
            } else {
                return res.json({success: false, msg: "Incorrect password"});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

router.get('/validate', (req, res) => {
    res.send("Validate");
});

router.get('/login', (req, res) => {
    res.send("Login");
});

module.exports = router;
