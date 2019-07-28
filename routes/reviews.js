const express = require('express');
const router = express.Router();

const Review = require('../models/review');

//newAtt
router.post('/add', (req, res, next) => {

    console.log(req.body)
    let newItem = new Review({
        description: req.body.description,
        timestamp: Date.now().toString(),
        attractionId: req.body.attractionId,
        userId: req.body.userId
    });

    Review.addReview(newItem, (error, item) => {
        if (error) {
            return res.json({ success: false, msg: 'Failed to add Review. Error: ' + error });
        } else {
            return res.json({ success: true, msg: 'Review added' });
        }
    });
});


router.get('/getAll', (req, res, next) => {

    Review.getAllReview((error, item) => {
        if (error) {
            return res.json({ success: false, msg: 'Failed to get Review. Error: ' + error });
        } else {
            return res.json({ success: true, msg: 'Success', item: item });
        }
    });
});


router.get('/get/:id', (req, res, next) => {

    Review.getReviewByID(req.params.id,(error, item) => {
        if (error) {
            return res.json({ success: false, msg: 'Failed to get Review . Error: ' + error });
        } else {
            return res.json({ success: true, msg: 'Success', item: item });
        }
    });
});

module.exports = router;
