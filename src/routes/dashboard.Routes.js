const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard.Controller.js')
const authController = require('../controllers/auth.Controller.js')

router.get('/',authController.isAuthenticated,dashboardController.inicio)


module.exports = router;