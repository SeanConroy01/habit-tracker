require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const Habit = require('./models/habit')
const date = require("./date");

require('./db/mongoose')

const port = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const day = date()
    Habit.find({}, (err, habitList) => {
        if (err) {
            console.log(err);
        }

        if (habitList.length == 0) {
            const defaultHabits = Habit.createDefault()
            Habit.insertMany(Habit.createDefault(), (err, habitList) => {
                (err) ? console.log(err) : console.log('Added default habits to DB');
            })
            habitList = defaultHabits
        } 
        res.render("list", {date: day, habits: habitList});
    })
});

app.post('/', (req, res) => {
    const newHabit = new Habit({
        title: req.body.newHabit
    });
    newHabit.save();
    res.redirect("/");
});

app.post('/delete', (req, res) => {
    Habit.findByIdAndDelete(req.body.checkbox, (err) => {
        (err) ? console.log(err) : console.log('Removed habit from database');
    });
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server is listening on port " + port)
});