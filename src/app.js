require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const membersRouter = require('./routes/membersRouter');
const messagesRouter = require('./routes/messagesRouter');

const app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

// Use middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());

// Use error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === 'development') {
    res.status(500).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

// Define the routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/member', membersRouter);
app.use('/messages', messagesRouter);

// Define the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
