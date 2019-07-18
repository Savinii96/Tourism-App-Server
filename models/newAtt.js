const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const AttractionSchema = mongoose.Schema({
    attractionName: {
        type: String,
        required: true
    },
    attractionCategory: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
   district: {
        type: String,
        required: true
    },
    gramaNiladhariDivision: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    latitude: {
        type: String,
        required: false
    },
   longitude: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    mobileNo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    availableTransportModes: {
        type: String,
        required: false
    },
    openingHours: {
        type: String,
        required: false
    },
    emergencyServices: {
        type: String,
        required: false
    },
    imageBase64: {
        type: String,
        required: false
    },
    approved: {
        type: Boolean,
        required: false
    }

});

const Attraction = module.exports = mongoose.model('Attraction', AttractionSchema);

module.exports.getAllAttractions = function (callback)  {
    Attraction.find({},callback)
};

// module.exports.getUserByUsername = function (username, callback) {
//     const query = {
//         username: username
//     };
//
//     Attraction.findOne(query, callback);
// };

module.exports.addAttraction= function (newAttraction, callback) {

            newAttraction.save(callback);

};

