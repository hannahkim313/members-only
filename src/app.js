require('dotenv').config();
const express = require('express');
const pool = require('./db/pool');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const membersRouter = require('./routes/membersRouter');
const messagesRouter = require('./routes/messagesRouter');

const app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

// Configure the Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Use middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(flash());
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
