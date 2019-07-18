const express = require('express');
const router = express.Router();

const Attraction = require('../models/newAtt');

//newAtt
router.post('/add', (req, res, next) => {

    console.log(req.body)
            let newItem = new Attraction({
                attractionName: req.body.attractionName,
                attractionCategory: req.body.attractionCategory,
                province: req.body.province,
                district: req.body.district,
                gramaNiladhariDivision: req.body.gramaNiladhariDivision,
                description: req.body.description,
                latitude: req.body.latitude,
                longitude:req.body.longitude,
                address: req.body.address,
                mobileNo: req.body.mobileNo,
                email: req.body.email,
                availableTransportModes: req.body.availableTransportModes,
                openingHours: req.body.openingHours,
                timestamp: Date.now().toString(),
                imageBase64:req.body.imageBase64
            });

            Attraction.addAttraction(newItem, (error, item) => {
                if (error) {
                    return res.json({success: false, msg: 'Failed to add item. Error: ' + error});
                } else {
                    return res.json({success: true, msg: 'Item added'});
                }
            });
});


router.get('/getAll', (req, res, next) => {

    Attraction.getAllAttractions( (error, item) => {
        if (error) {
            return res.json({success: false, msg: 'Failed to add item. Error: ' + error});
        } else {
            return res.json({success: true, msg: 'Item added',item:item});
        }
    });
});
// //get a newAtt from the database
// router.post('/:id', (req, res, next) => {
//     const id = req.params.id;
//
//     newAtt.getnewAttById(id, (error, item) => {
//         if (error) {
//             return res.json({success: false, msg: "An error occurred: " + error});
//         }
//
//         if (!item) {
//             return res.json({success: false, msg: "Item not found"});
//         } else {
//             Seller.getUserById(item.seller, (error, seller) => {
//                 if (error) {
//                     return res.json({success: false, msg: "An error occurred: " + error});
//                 }
//
//                 if (!seller) {
//                     return res.json({success: false, msg: "Seller not found"});
//                 } else {
//                     Review.getReviewsByItem(item._id, (error, reviews) => {
//                         if (error) {
//                             return res.json({success: false, msg: "An error occurred: " + error});
//                         }
//
//                         if (!reviews) {
//                             return res.json({success: true, item: item, seller: seller.username});
//                         } else {
//                             return res.json({success: true, item: item, seller: seller.username, reviews: reviews});
//                         }
//                     });
//                 }
//             });
//         }
//     });
// });
//
// //delete an item
// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id;
//
//
//     Item.getItemById(id, (error, item) => {
//         if (error) {
//             return res.json({success: false, msg: 'An error occurred: ' + error});
//         }
//
//         if (!item) {
//             return res.json({success: false, msg: "Item not found"});
//         }
//         else {
//             Seller.getUserById(item.seller, (error, seller) => {
//                 if (error) {
//                     return res.json({success: false, msg: 'An error occurred: ' + error});
//                 }
//
//                 if (!seller) {
//                     return res.json({success: false, msg: "Seller not found"});
//                 }
//                 else {
//                     seller.sellingItems.remove(item);
//
//                     Item.deleteItemById(id, (error, item) => {
//                         if (error) {
//                             return res.json({success: false, msg: 'An error occurred: ' + error});
//                         }
//
//                         if (!item) {
//                             return res.json({success: false, msg: "Item not found"});
//                         } else {
//                             seller.save();
//
//                             Review.getReviewsByItem(item._id, (error, reviews) => {
//                                 if (error) {
//                                     return res.json({success: false, msg: 'An error occurred: ' + error});
//                                 }
//
//                                 reviews.forEach((review) => {
//                                     Review.deleteReview(review._id, (error, deletedReview) => {
//                                         if (error) {
//                                             return res.json({success: false, msg: 'An error occurred: ' + error});
//                                         }
//                                     })
//                                 });
//                             });
//
//                             item.favBy.forEach((user) => {
//                                 let newNot = new Notification({
//                                     fromId: seller._id,
//                                     fromType: 'seller',
//                                     fromUsername: seller.username,
//                                     to: user,
//                                     type: 'deleteFav',
//                                     checked: false,
//                                     timestamp: Date.now().toString()
//                                 });
//
//                                 Notification.newNotification(newNot, (error, notification) => {
//                                     if (error) {
//                                         console.log('Error sending notification. Error: ' + error);
//                                     }
//                                 })
//                             });
//
//                             return res.json({success: true, msg: 'Item deleted'});
//                         }
//                     });
//                 }
//             })
//         }
//     });
// });
//
// //edit an item
// router.put('/:id', (req, res, next) => {
//     const itemId = req.params.id;
//
//     const editedItem = {
//         name: req.body.name,
//         category: req.body.category,
//         price: req.body.price,
//         location: req.body.location,
//         description: req.body.description,
//         isAvailable: req.body.isAvailable
//     };
//
//     Item.updateItem(itemId, editedItem, (error, item) => {
//         if (error) {
//             return res.json({success: false, msg: 'Failed to update item. Error: ' + error});
//         }
//
//         if (!item) {
//             return res.json({success: false, msg: 'Item not found'});
//         }
//         else {
//             item.favBy.forEach((user) => {
//                 Seller.getUserById(item.seller, (error, seller) => {
//                     if (error) {
//                         console.log('Error sending notification. Error: ' + error);
//                     }
//
//                     if (!seller) {
//                         console.log('Error sending notification. Error: ' + error);
//                     } else {
//                         let newNot = new Notification({
//                             fromId: seller._id,
//                             fromType: 'seller',
//                             fromUsername: seller.username,
//                             to: user,
//                             itemId: item._id,
//                             itemType: 'item',
//                             type: 'updateFav',
//                             checked: false,
//                             timestamp: Date.now().toString()
//                         });
//
//                         Notification.newNotification(newNot, (error, notification) => {
//                             if (error) {
//                                 console.log('Error sending notification. Error: ' + error);
//                             }
//                         })
//                     }
//                 });
//             });
//             return res.json({success: true, msg: 'Item updated'});
//         }
//     });
// });
//
// //favorite an item
// router.post('/:id/favorite', (req, res, next) => {
//     const userId = req.body.userId;
//     const itemId = req.body.itemId;
//
//     Customer.getUserById(userId, (error, customer) => {
//         if (error) {
//             return res.json({success: false, msg: 'Failed to add item to favorites. Error: ' + error});
//         }
//
//         if (!customer) {
//             return res.json({success: false, msg: 'User not found'});
//         } else {
//             Item.getItemById(itemId, (error, item) => {
//                 if (error) {
//                     return res.json({success: false, msg: 'Failed to add item to favorites' + error});
//                 }
//
//                 if (!item) {
//                     return res.json({success: false, msg: 'Item not found'});
//                 } else {
//                     customer.favItems.push(item._id);
//                     item.favBy.push(customer._id);
//
//                     customer.save();
//                     item.save();
//
//                     let newNot = new Notification({
//                         fromId: customer._id,
//                         fromType: 'customer',
//                         fromUsername: customer.username,
//                         to: item.seller,
//                         itemId: item._id,
//                         itemType: 'item',
//                         type: 'favorite',
//                         checked: false,
//                         timestamp: Date.now().toString()
//                     });
//
//                     Notification.newNotification(newNot, (error, notification) => {
//                         if (error) {
//                             console.log('Error sending notification. Error: ' + error);
//                         }
//                     });
//
//                     return res.json({success: true, msg: 'The item has been added to your favorites'});
//                 }
//             })
//         }
//     })
// });
//
// //unfavorite an item
// router.post('/:id/unfavorite', (req, res, next) => {
//     const userId = req.body.userId;
//     const itemId = req.body.itemId;
//
//     Customer.getUserById(userId, (error, customer) => {
//         if (error) {
//             return res.json({success: false, msg: 'Failed to add item to favorites' + error});
//         }
//
//         if (!customer) {
//             return res.json({success: false, msg: 'User not found'});
//         } else {
//             Item.getItemById(itemId, (error, item) => {
//                 if (error) {
//                     return res.json({success: false, msg: 'Failed to add item to favorites' + error});
//                 }
//
//                 if (!item) {
//                     return res.json({success: false, msg: 'Item not found'});
//                 } else {
//                     customer.favItems.remove(item);
//                     item.favBy.remove(customer);
//
//                     customer.save();
//                     item.save();
//
//                     Notification.deleteFavNot(item._id, customer._id, (error, notification) => {
//                         if (error) {
//                             console.log('Error sending notification. Error: ' + error);
//                         }
//                     });
//
//                     return res.json({success: true, msg: 'The item has been removed from your favorites'});
//                 }
//             });
//         }
//     });
// });

module.exports = router;
