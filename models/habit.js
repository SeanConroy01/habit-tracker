const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

habitSchema.statics.createDefault = function() {
    const habitOne = new Habit({
        title: "Welcome to your Habit Tracker!"
    });
    const habitTwo = new Habit({
        title: "Hit the + button to add a new habit."
    });
    const habitThree = new Habit({
        title: "<-- Hit this to mark as complete."
    });
    const habitFour = new Habit({
        title: "Hit this to delete or edit. -->"
    });
    
    return [habitOne, habitTwo, habitThree, habitFour]
}

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit