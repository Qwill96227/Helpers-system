const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.userId = user._id;
    return res.redirect('/dashboard');
  }
  res.redirect('/login?error=invalid');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

exports.register = async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 12);
    await new User({ email: req.body.email, password: hashed }).save();
    res.redirect('/login');
  };