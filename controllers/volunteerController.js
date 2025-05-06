const Volunteer = require('../models/Volunteer');
const Task = require('../models/Task');
const TaskNotifier = require('../observer/TaskNotifier');

exports.subscribe = async (req, res) => {
  let volunteer = await Volunteer.findOne({ identifier: req.body.identifier });
  if (!volunteer) {
    volunteer = new Volunteer({
      identifier: req.body.identifier,
      name: req.body.name,
      email: req.body.email
    });
  }

  const task = await Task.findById(req.body.taskId);
  if (!task.volunteers.includes(volunteer._id)) {
    task.volunteers.push(volunteer._id);
  }
  if (!volunteer.tasks.includes(task._id)) {
    volunteer.tasks.push(task._id);
  }

  await task.save();
  await volunteer.save();

  TaskNotifier.notify(task);
  res.redirect('/');
};

exports.viewSubscriptions = async (req, res) => {
  const volunteer = await Volunteer.findOne({ identifier: req.params.identifier }).populate('tasks');
  if (!volunteer) {
    return res.status(404).send("Volunteer not found");
  }

  res.render('subscriptions', { volunteer });
};