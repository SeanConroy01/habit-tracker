const Habit = require('../models/habit');
const {getToday, getYesterday} = require('./date');

var CronJob = require('cron').CronJob;

// Run job every day at 12:00am - 0 0 * * *
var job = new CronJob('0 0 * * *', function() {s
        let yesterday = getYesterday();

        Habit.updateMany({}, [{
            $project: {
                title: true,
                __v: true,
                createdAt: true,
                updatedAt: true,
                highestStreak: true,
                streak : {
                    $cond: { 
                        if: { $ne: [ "$complete", true ], $ne: [ "$completeAt", yesterday ] }, 
                        then: 0,
                        else: "$streak"
                    }
                },
            }
        }], (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
);

job.start();