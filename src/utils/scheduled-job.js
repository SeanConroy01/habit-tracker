const { CronJob } = require('cron');
const updateHabits = require('./update-habits');

// Run job every day at 12:00am - 0 0 * * *
const job = new CronJob('0 0 * * *', () => {
  updateHabits();
});

job.start();
