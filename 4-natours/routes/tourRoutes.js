const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
router.route('/').post(tourController.postTour).get(tourController.getAllTours);
router
  .route('/:id')
  .get(tourController.allTourId)
  .patch(tourController.fatchTour)
  .delete(tourController.deleteTour);
module.exports = router;
