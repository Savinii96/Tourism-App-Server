const express = require('express');
const router = express.Router();

const Ratings = require('../models/ratings');

//newAtt
router.post('/add', (req, res, next) => {

    console.log(req.body)
    let newItem = new Ratings({
        rating: req.body.rating,
        timestamp: Date.now().toString(),
        attractionId: req.body.attractionId,
        userId: req.body.userId
    });

    Ratings.addRating(newItem, (error, item) => {
        if (error) {
            return res.json({ success: false, msg: 'Failed to add Rating. Error: ' + error });
        } else {
            return res.json({ success: true, msg: 'Rating added' });
        }
    });
});


router.get('/getAll', (req, res, next) => {

    Ratings.getAllRating((error, item) => {
        if (error) {
            return res.json({ success: false, msg: 'Failed to get Rating. Error: ' + error });
        } else {
            return res.json({ success: true, msg: 'Success', item: item });
        }
    });
});


router.get('/get/:id', (req, res, next) => {

    Ratings.getRatingByID(req.params.id,(error, item) => {
        if (error) {
            return res.json({ success: false, msg: 'Failed to get Rating. Error: ' + error });
        } else {
            return res.json({ success: true, msg: 'Success', item: item });
        }
    });
});

module.exports = router;
