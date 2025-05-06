const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./utils/db');
const app = express();

require('dotenv').config();
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Routes
app.use('/', require('./routes/tasks'));
app.use('/auth', require('./routes/auth'));
app.use('/volunteers', require('./routes/volunteers'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));

app.get('/', (req, res) => {
  res.redirect('/login');
});
