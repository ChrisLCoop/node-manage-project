const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.Controller')
const authController = require('../controllers/auth.Controller.js')

router.get('/',authController.isAuthenticated,reportController.inicio)

module.exports = router;
