  const express = require('express');
  const router = express.Router();
  const {userAuth} = require('../../util/middleware/auth/userAuth');
  const {login} = require('./functions/login');
  const {register} = require('./functions/register');
  const {logout} = require('./functions/logout');
  const {emailVerify} = require('./functions/emailVerify');
  const {EditInfo} = require('./functions/editInfo');
  const { initialisePasswordReset,
          passwordResetVerify } = require('./functions/passwordReset');


  router.post('/login', login);
  router.post('/register', register);
  router.post('/logout',logout);
  router.post('/forgotpassword',initialisePasswordReset);
  router.post('/passwordreset',passwordResetVerify);
  router.post('/edit',userAuth,EditInfo);

  router.get('/verify-email/:emailToken',emailVerify);


  module.exports = router;