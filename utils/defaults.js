const Habit = require('../models/habit');

const habitOne = new Habit({
  title: 'Welcome to your Habit Tracker!'
});
const habitTwo = new Habit({
  title: 'Hit the + button to add a new habit.'
});
const habitThree = new Habit({
  title: '<-- Hit this to mark as complete.'
});
const habitFour = new Habit({
  title: 'Hit the pen button to edit a habit.'
});

module.exports = [habitOne, habitTwo, habitThree, habitFour];
