const mongoose = require("mongoose");

const updateSchema = mongoose.Schema({
  title: { type: String, required: true },
  points: [String],
});

const projectSchema = mongoose.Schema({
  name: String,
  creator: String,
  date: Date,
  updates: [updateSchema],
});

const Projects = mongoose.model("Projects", projectSchema, "Projects");
module.exports = Projects;
