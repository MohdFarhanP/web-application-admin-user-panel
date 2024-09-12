const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminCondrollelr')
const auth = require('../middleware/adminAuth')


router.get('/login',auth.isLogin,adminController.loadLogin)
router.post('/loginBtn',adminController.loginBtn)
router.get('/dashboard',auth.checkSession,adminController.loadDashboard);
router.post('/saveChange',auth.checkSession,adminController.edituser)
router.post('/delete',auth.checkSession,adminController.deleteUser)
router.post('/addUser',auth.checkSession,adminController.addUser)
router.post('/logout',auth.checkSession,adminController.logout)
router.post('/search',auth.checkSession,adminController.search)

module.exports = router;

