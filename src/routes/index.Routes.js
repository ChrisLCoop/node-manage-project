const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.Controller.js')
const authController = require('../controllers/auth.Controller.js')


router.get("/",indexController.pageLoginUser );

router.post('/login',authController.login);


module.exports = router;