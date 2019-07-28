const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    timestamp: {
        type: String,
        required: false
    },
    attractionId: {
        type: String,
        required: false
    },

});

const Rating = module.exports = mongoose.model('Rating', RatingSchema);

module.exports.getAllRating = function (callback) {
    Rating.find({}, callback)
};

module.exports.addRating = function (newAttraction, callback) {
    newAttraction.save(callback);
};

module.exports.getRatingByID = function (id, callback) {
    Rating.find({attractionId:id}, callback)
};


