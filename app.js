require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const date = require("./date")

const port = process.env.PORT || 5000;

const app = express();

const habits = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const day = date();
    res.render("list", {date: day, habits});
})

app.post('/', (req, res) => {
    habits.push(req.body.newHabit);
    res.redirect("/");
})

app.listen(port, () => {
    console.log("Server is listening on port " + port)
})