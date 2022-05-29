const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Habit = require('../src/models/habit');
const { getToday } = require('../src/utils/date');

const habitOneID = new mongoose.Types.ObjectId();
const habitOne = {
  _id: habitOneID,
  title: 'habit-1'
};

const habitTwoID = new mongoose.Types.ObjectId();
const habitTwo = {
  _id: habitTwoID,
  title: 'habit-2',
  complete: true,
  completeAt: getToday(),
  streak: 1,
  highestStreak: 2,
};

beforeEach(async () => {
  await Habit.deleteMany();
  await new Habit(habitOne).save();
  await new Habit(habitTwo).save();
});

test('Should create a new habit', async () => {
  await request(app)
    .post('/')
    .send({ title: 'habit-3' })
    .expect(302);

  const habit = await Habit.findOne({ title: 'habit-3' });
  expect(habit).not.toBeNull();
  expect(habit.complete).toEqual(false);
});

test('Should mark a habit as complete', async () => {
  await request(app)
    .post('/complete')
    .send({
      id: habitOneID,
      streak: '0',
      complete: 'false'
    })
    .expect(302);

  const habit = await Habit.findById(habitOneID);
  expect(habit).not.toBeNull();
  expect(habit.complete).toEqual(true);
  expect(habit.completeAt).toEqual(String(getToday()));
  expect(habit.streak).toEqual(1);
  expect(habit.highestStreak).toEqual(1);
});

test('Should mark a habit as incomplete', async () => {
  await request(app)
    .post('/complete')
    .send({
      id: habitTwoID,
      streak: String(habitTwo.streak),
      complete: String(habitTwo.complete)
    })
    .expect(302);

  const habit = await Habit.findById(habitTwoID);
  expect(habit).not.toBeNull();
  expect(habit.complete).toEqual(false);
  expect(habit.streak).toEqual(0);
  expect(habit.highestStreak).toEqual(2);
});

test('Should delete a habit', async () => {
  await request(app)
    .post('/delete')
    .send({ id: habitOneID })
    .expect(302);

  const habit = await Habit.findById(habitOneID);
  expect(habit).toBeNull();
});
