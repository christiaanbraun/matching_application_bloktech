const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const User = require('./models/user');

const app = express();
// Connect to MongoDB
const dbURI = `mongodb+srv://test_user1:${process.env.DB_PASS}@buster.boqc9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('DB connection succesful'))
  .catch((err) => console.log(err));

const port = 5000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Static files are in public folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  User.findOne({ username: 'Donni Brouwer' }).then((result) => {
    res.render('pages/home', { title: 'Home', user: result });
  });
});

app.get('/adduser', (req, res) => {
  res.render('pages/adduser', { title: 'Add a User' });
});

app.get('/allusers', (req, res) => {
  User.find().then((result) => {
    res.render('pages/allusers', { title: 'All Users', user: result });
  });
});

app.get('/profile', (req, res) => {
  User.findOne({ username: 'Wutru' }).then((result) => {
    res.render('pages/my_profile', { title: 'Profile', user: result });
  });
});

app.get('/editprofile', (req, res) => {
  User.findOne({ username: 'Wutru' }).then((result) => {
    res.render('pages/editprofile', { title: 'Edit Profile', user: result });
  });
});

app.post('/adduser', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((result) => {
      res.redirect('/profile');
    })
    .catch((err) => {
      console.log(err);
    });
});

// Set port and verify the server is working
app.listen(port, function () {
  console.log(`server is running on localhost:${port}`);
});
