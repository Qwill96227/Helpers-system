const Volunteer = require('../models/Volunteer');
const Task = require('../models/Task');
const TaskNotifier = require('../observer/TaskNotifier');

exports.subscribe = async (req, res) => {
  const { name, email, identifier, taskId } = req.body;

  if (!identifier || !email || !taskId) {
    return res.status(400).send("Missing required fields.");
  }

  let volunteer = await Volunteer.findOne({ identifier });

  if (!volunteer) {
    volunteer = new Volunteer({ name, email, identifier });
    await volunteer.save();
  }

  const task = await Task.findById(taskId);
  if (!task.volunteers.includes(volunteer._id)) {
    task.volunteers.push(volunteer._id);
    await task.save();
  }

  if (!volunteer.tasks.includes(task._id)) {
    volunteer.tasks.push(task._id);
    await volunteer.save();
  }

  res.redirect('/');
};

exports.viewSubscriptions = async (req, res) => {
  const volunteer = await Volunteer.findOne({ identifier: req.params.identifier }).populate('tasks');
  if (!volunteer) {
    return res.status(404).send("Volunteer not found");
  }

  res.render('subscriptions', { volunteer });
};