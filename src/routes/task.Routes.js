const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.Controller.js')
const authController = require('../controllers/auth.Controller.js')

router.get('/',authController.isAuthenticated,taskController.inicio)


router.post('/option-task',authController.isAuthenticated,taskController.optionTask)
router.post('/new-task-progress',authController.isAuthenticated,taskController.newTaskProgress)
router.post('/ed-de-task-progress',authController.isAuthenticated,taskController.optionTaskProgress)
router.post('/edit-task-progress',authController.isAuthenticated,taskController.editTaskProgress)

module.exports = router;