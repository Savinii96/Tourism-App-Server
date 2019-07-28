const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    description: {
        type: String,
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

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.getAllReview = function (callback) {
    Review.find({}, callback)
};

module.exports.addReview = function (newAttraction, callback) {
    newAttraction.save(callback);
};

module.exports.getReviewByID = function (id, callback) {
    Review.find({attractionId:id}, callback)
};


