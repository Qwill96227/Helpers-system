const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.userId = user._id;
    return res.redirect('/dashboard');
  }
  res.redirect('/auth/login?error=1');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

exports.register = async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 12);
    await new User({ email: req.body.email, password: hashed }).save();
    res.redirect('/login');
  };