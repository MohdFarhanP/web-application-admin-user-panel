const express = require('express');
const router = express.Router();
const userCondroller = require('../controller/userController')
const auth = require('../middleware/userAuth')


router.get('/login',auth.isLogin,userCondroller.loadLogin)
router.get('/signup',auth.isLogin,userCondroller.loadSignup  );
router.get('/home',auth.checkSession,userCondroller.loadHome)
router.post('/loginBtn',userCondroller.loginUser)
router.post('/signupBtn',userCondroller.signupUser)
router.get('/logout',auth.checkSession,userCondroller.logout)

module.exports = router;