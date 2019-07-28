const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    access: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    telephoneNo: {
        type: String,
        required: false
    },
    mobileNo: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username: username
    };
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePass, hash, callback) {
    bcrypt.compare(candidatePass, hash, (error, isMatch) => {
        if (error) throw error;
        callback(null, isMatch);
    });
};
