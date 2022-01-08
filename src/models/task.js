const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

});

// const t1 = new Task({
//   description: "clean house",
//   completed: true,
// });

// t1.save().then(() => {
//   console.log(t1);
// }).catch(error => {
//   console.log(error);
// })

module.exports = Task;