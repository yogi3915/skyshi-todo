const express = require("express")
const router = express.Router()
const activity = require('../controllers/activity')
const todo = require('../controllers/todo')

router.get('/activity-groups', activity.getAllActivity)
router.post('/activity-groups', activity.createActivity)
router.get('/activity-groups/:id', activity.getOneActivity)
router.delete('/activity-groups/:id', activity.deleteActivity)
router.patch('/activity-groups/:id', activity.updateActivity)

router.get('/todo-items', todo.getAllTodo)
router.post('/todo-items', todo.createTodo)
router.get('/todo-items/:id', todo.getOneTodo)
router.delete('/todo-items/:id', todo.deleteTodo)
router.patch('/todo-items/:id', todo.updateTodo)


module.exports = router