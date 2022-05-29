const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  completeAt: {
    type: String
  },
  streak: {
    type: Number,
    default: 0
  },
  highestStreak: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
