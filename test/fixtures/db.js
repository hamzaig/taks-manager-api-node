const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../../src/models/task");
const User = require("../../src/models/user");


const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "hamza ali khalid",
  email: "hamaig@yahoo.com",
  password: "Mahmoodk1",
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
  }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "mogli",
  email: "mogli@yahoo.com",
  password: "Mogli123456",
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
  }]
}

const taskOne = new Task({
  _id: mongoose.Types.ObjectId(),
  description: "Task 1",
  completed: false,
  owner: userOneId,
})
const taskTwo = new Task({
  _id: mongoose.Types.ObjectId(),
  description: "Task 2",
  completed: false,
  owner: userOneId,
})
const taskThree = new Task({
  _id: mongoose.Types.ObjectId(),
  description: "Task 3",
  completed: true,
  owner: userTwoId,
})

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
}