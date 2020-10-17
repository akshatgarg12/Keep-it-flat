const express = require('express');
const router = express.Router();
const {userAuth} = require('./../../util/middleware/auth/userAuth');
const {postActivity} = require('./functions/postActivity');
const {getActivity} = require('./functions/getActivity');
const {deleteActivity} = require('./functions/deleteActivity');
const {getTodaysData, getWeeksData} = require('./functions/graphs');

router.route('/')
      .post(userAuth,postActivity)
      .get(userAuth,getActivity)
      .delete(userAuth,deleteActivity)

router.get('/today', userAuth,getTodaysData);
router.get('/week', userAuth,getWeeksData);

module.exports = router;

