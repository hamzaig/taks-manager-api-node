const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password does not contain 'password' word");
      }
    }
  },
  age: {
    default: 0,
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive number");
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }],
  avatar: {
    type: Buffer,
  },
}, {
  timestamps: true,
});

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
})

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
  // console.log(User);
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login")
  }
  // console.log(user);
  // console.log(password);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unabale to login");
  }
  return user;
}

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next();
})

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id })
  next();
})


const User = mongoose.model("User", userSchema);


// const me = new User({
//   name: "       Hamzaig          ",
//   email: "      hamZAa@yahoo.com      ",
//   password: "hamzaig123"
// });

// me.save().then(() => {
//   console.log(me);
// }).catch(error => {
//   console.log(error);
// })

module.exports = User;