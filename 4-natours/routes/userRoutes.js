const express = require('express');
const userController = require('./../controllers/userController');
const fs = require('fs');

const router = express.Router();
router.route('/').get(userController.getAllUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.allUserId)
  .patch(userController.fatchUser)
  .delete(userController.deleteUser);
module.exports = router;
