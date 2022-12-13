const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: String,
  creator: String,
  date: Date,
  Updates: [
    {
      title: String,
      points: [String],
    },
  ],
});

const Projects = mongoose.model("Projects", projectSchema, "Projects");
module.exports = Projects;
