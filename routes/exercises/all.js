const express = require('express');
const router = express.Router();
const {getExercise} = require('./functions/getExercise');
const {postExercise} = require('./functions/postExercise');
const {userAuth} = require('../../util/middleware/auth/userAuth');
const {adminAuth} = require('../../util/middleware/auth/adminAuth');

router.route('/')
      .get(userAuth,getExercise)
      .post(adminAuth,postExercise)


module.exports = router;