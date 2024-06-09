const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.Controller.js')
const uploadfile = require('../../middleware/multer.js')
const authController = require('../controllers/auth.Controller.js')


router.get('/',authController.isAuthenticated,usersController.general)
router.get('/new-user',authController.isAuthenticated,usersController.pagenewuser)
router.get('/category',authController.isAuthenticated,usersController.pagecategoryuser)
router.get('/new-role-user',authController.isAuthenticated,usersController.pageCreateRoleUser)
router.get('/edit-user',authController.isAuthenticated,usersController.pageEditUser)

router.post('/create-new-role-user',authController.isAuthenticated,usersController.createNewRoleUser)

router.get('/logout',authController.isAuthenticated,authController.logout)


router.post('/create-user',authController.isAuthenticated,authController.register)


router.post('/edit-info-user',authController.isAuthenticated,usersController.editInfoUser)
router.post('/update-avatar-user',authController.isAuthenticated,uploadfile(),usersController.editAvatarProfileuser)

//creation super user
//router.get('/role-temp',usersController.userRoleTemp)
//router.post('/create-user-temp',authController.register)

module.exports = router;