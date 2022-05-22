const { CronJob } = require('cron');
const Habit = require('../models/habit');
const { getYesterday } = require('./date');

// Run job every day at 12:00am - 0 0 * * *
const job = new CronJob('0 0 * * *', () => {
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
          if: { $and: [{ $ne: ['$complete', true] }, { $ne: ['$completeAt', yesterday] }] },
          then: 0,
          else: '$streak'
        }
      },
    }
  }], (err) => {
    if (err) {
      console.log(err);
    }
  });
});

job.start();
