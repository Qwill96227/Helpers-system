exports.subscribe = async (req, res) => {
    let volunteer = await Volunteer.findOne({ identifier: req.body.identifier });
    if (!volunteer) {
      volunteer = new Volunteer({ identifier: req.body.identifier });
    }
  
    const task = await Task.findById(req.body.taskId);
    task.volunteers.push(volunteer._id);
    volunteer.tasks.push(task._id);
  
    await task.save();
    await volunteer.save();
  
    TaskNotifier.notify(task);
    res.redirect('/');
  };
  
