const express = require('express')
const router = express.Router()
const proyectoController = require('../controllers/proyecto.Controller.js')
const authController = require('../controllers/auth.Controller.js')

router.get('/',authController.isAuthenticated,proyectoController.inicio)
router.get('/project-status',authController.isAuthenticated,proyectoController.pageProjectStatus)
router.get('/new-project',authController.isAuthenticated,proyectoController.pageCreateProject)
router.get('/create-task-status',authController.isAuthenticated,proyectoController.pageCreateTaskStatus)

router.post('/new-project-status',proyectoController.newProjectStatus)
router.post('/create-new-project',proyectoController.createNewProject)
router.post('/option-project',authController.isAuthenticated,proyectoController.optionProject)
router.post('/ad-re-team',proyectoController.addOrRemoveTeam)
router.post('/manage-task',authController.isAuthenticated,proyectoController.pageAdminTask)
router.post('/new-task-creation',authController.isAuthenticated,proyectoController.pageNewTask)
router.post('/new-task-status',authController.isAuthenticated,proyectoController.newTaskStatus)
router.post('/new-task',authController.isAuthenticated,proyectoController.newTask)
router.post('/update-project',authController.isAuthenticated,proyectoController.updateProject)
router.post('/option-task',authController.isAuthenticated,proyectoController.optionTask)
router.post('/update-task',authController.isAuthenticated,proyectoController.updateTask)

module.exports = router;