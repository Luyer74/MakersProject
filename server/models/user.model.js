const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (userpassword) {
  return bcrypt.compare(userpassword, this.password);
};

const Users = mongoose.model("Users", userSchema, "Users");
module.exports = Users;
