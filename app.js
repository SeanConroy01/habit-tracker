require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Habit = require('./models/habit');
const defaultHabits = require('./utils/defaults');
const updateHabits = require('./utils/update-habits');
const { getToday } = require('./utils/date');

require('./db/mongoose');
require('./utils/scheduled-job');

updateHabits();

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const date = getToday();
  Habit.find({}, (err, habitList) => {
    if (err) {
      console.log(err);
    }

    if (habitList.length === 0) {
      Habit.insertMany(defaultHabits, (err) => {
        (err) ? console.log(err) : console.log('Added default habits to DB');
      });
      habitList = defaultHabits;
    }
    res.render('list', { date, habits: habitList });
  });
});

app.post('/', (req, res) => {
  const newHabit = new Habit({
    title: req.body.title
  });
  newHabit.save();
  res.redirect('/');
});

app.post('/complete', (req, res) => {
  const isComplete = !(req.body.complete === 'true');
  let currentStreak = parseInt(req.body.streak, 10);

  if (isComplete) {
    currentStreak += 1;
  } else {
    currentStreak -= 1;
  }

  Habit.findByIdAndUpdate(req.body.id, [{
    $set: {
      complete: isComplete,
      completeAt: getToday(),
      streak: currentStreak,
      highestStreak: {
        $cond: {
          if: { $gte: [currentStreak, '$highestStreak'] },
          then: currentStreak,
          else: '$highestStreak'
        }
      }
    }
  }], (err) => {
    (err) ? console.log(err) : console.log('Updated habit in database');
  });
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  Habit.findByIdAndDelete(req.body.id, (err) => {
    (err) ? console.log(err) : console.log('Removed habit from database');
  });
  res.redirect('/');
});

module.exports = app;
