const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
router.param('id', tourController.checkId);
//create a checkbody middleware
//check if body contains the name and price property
//if not, send back 400 (bad request)
//add it to the post handler stack
router
  .route('/')
  .post(tourController.checkBody, tourController.postTour)
  .get(tourController.getAllTours);
router
  .route('/:id')
  .get(tourController.allTourId)
  .patch(tourController.fatchTour)
  .delete(tourController.deleteTour);
module.exports = router;
