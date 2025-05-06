const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks/create', taskController.createTask);
router.post('/tasks/dismiss/:taskId', taskController.dismissVolunteer);
router.get('/stats', taskController.showStats);
router.get('/dashboard', async (req, res) => {
  // Load user tasks
  const Task = require('../models/Task');
  const tasks = await Task.find({ owner: req.session.userId }).populate('volunteers');
  res.render('dashboard', { tasks });
});

module.exports = router;