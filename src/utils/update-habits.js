const Habit = require('../models/habit');
const { getToday, getYesterday } = require('./date');

const updateHabits = () => {
  const today = getToday();

  Habit.updateMany({}, [{
    $project: {
      title: true,
      __v: true,
      createdAt: true,
      updatedAt: true,
      highestStreak: true,
      streak: {
        $cond: {
          if: { $and: [{ $eq: ['$complete', true] }, { $or: [{ $eq: ['$completeAt', getYesterday()] }, { $eq: ['$completeAt', today] }] }] },
          then: '$streak',
          else: 0
        }
      },
      complete: {
        $cond: {
          if: { $and: [{ $eq: ['$complete', true] }, { $eq: ['$completeAt', today] }] },
          then: true,
          else: undefined
        }
      },
      completeAt: {
        $cond: {
          if: { $and: [{ $eq: ['$complete', true] }, { $eq: ['$completeAt', today] }] },
          then: '$completeAt',
          else: undefined
        }
      }
    }
  }], (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = updateHabits;
