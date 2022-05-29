const Habit = require('../models/habit');
const { getYesterday } = require('./date');

const updateHabits = () => {
  const yesterday = getYesterday();

  Habit.updateMany({}, [{
    $project: {
      title: true,
      __v: true,
      createdAt: true,
      updatedAt: true,
      highestStreak: true,
      streak: {
        $cond: {
          if: { $and: [{ $eq: ['$complete', true] }, { $eq: ['$completeAt', yesterday] }] },
          then: '$streak',
          else: 0
        }
      },
    }
  }], (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = updateHabits;
