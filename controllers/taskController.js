const Task = require('../models/Task');
const Volunteer = require('../models/Volunteer');
const TaskNotifier = require('../observer/TaskNotifier');

exports.createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    owner: req.session.userId
  });
  await task.save();
  res.redirect('/dashboard');
};

exports.dismissVolunteer = async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  task.volunteers.pull(req.body.volunteerId);
  await task.save();

  TaskNotifier.notify(task);  // Observer notify
  res.redirect('/dashboard');
};

exports.showStats = async (req, res) => {
  const tasks = await Task.find({ active: true }).populate('volunteers');
  const stats = tasks.map(t => ({ title: t.title, count: t.volunteers.length }));
  res.render('stats', { stats });
};

