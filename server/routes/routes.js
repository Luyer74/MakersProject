const Project = require("../models/project.model");
const User = require("../models/user.model");
const verify = require("../middleware/verifyAccess");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/projects", verify, async (req, res) => {
  const { page = 1, limit = 2 } = req.query;

  try {
    const allProjects = await Project.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Project.count();

    res.json({
      allProjects,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/projects/:id", verify, async (req, res) => {
  id = req.params.id;
  project = Project.findById(id);
  res.send(project);
});

app.get("/api/projects/name/:name", verify, async (req, res) => {
  project = await Project.find({ name: req.params.name });
  res.json(project);
});

app.get("/api/projects/creator/:creator", verify, async (req, res) => {
  project = await Project.find({ creator: req.params.creator });
  res.json(project);
});

app.get("/api/projects/date", verify, async (req, res) => {
  let { startDate, endDate } = req.query;
  startDate = Date.parse(startDate);
  endDate = Date.parse(endDate);
  if (!startDate || !endDate) {
    res.json("Invalid date");
  } else {
    projects = await Project.find({
      date: { $gte: startDate, $lte: endDate },
    });
    res.json(projects);
  }
});

app.post("/api/projects/create", verify, async (req, res) => {
  Project.insertMany([req.body], (err) => {
    console.log(err);
  });
  res.send("insert successful!");
});

app.post("/api/projects/edit/:id", verify, async (req, res) => {
  id = req.params.id;
  let ans = await Project.findOneAndUpdate({ _id: id }, req.body);
  res.send(ans);
});

app.post("/api/projects/delete/:id", verify, async (req, res) => {
  id = req.params.id;
  let ans = await Project.deleteOne({ _id: id });
  res.send(ans);
});

app.post("/login", async function (req, res) {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });

  if (!user) {
    res.send("User doesn't exist");
  } else {
    let valid = await user.validatePassword(password);
    if (valid) {
      let token = jwt.sign(
        { id: user.email, permission: true },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.send("Login successful");
    } else {
      res.send("Incorrect Password");
    }
  }
});

app.post("/register", async function (req, res) {
  let user = new User(req.body);
  let previousUser = User.findOne({ email: user.email });
  if (previousUser) {
    res.send("User already exists");
  } else {
    user.password = user.encryptPassword(user.password);

    await user.save();

    res.send("User created");
  }
});

app.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.send("User logged out");
});

module.exports = app;
