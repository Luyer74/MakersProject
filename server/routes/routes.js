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
  project = await Project.findById(id);
  res.json(project);
});

app.get("/api/projects/name/:name", verify, async (req, res) => {
  const { page = 1, limit = 2 } = req.query;

  try {
    const allProjects = await Project.find({ name: req.params.name })
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

app.get("/api/projects/creator/:creator", verify, async (req, res) => {
  const { page = 1, limit = 2 } = req.query;

  console.log(req.params.creator);

  try {
    const allProjects = await Project.find({ creator: req.params.creator })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Project.count({ creator: req.params.creator });

    res.json({
      allProjects,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/projects/date/getDate", verify, async (req, res) => {
  let { startDate, endDate } = req.query;
  startDate = Date.parse(startDate);
  endDate = Date.parse(endDate);
  if (!startDate || !endDate) {
    res.json({ status: "Invalid" });
  } else {
    const { page = 1, limit = 2 } = req.query;

    console.log(req.params.creator);

    try {
      const allProjects = await Project.find({
        date: { $gte: startDate, $lte: endDate },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Project.count({
        date: { $gte: startDate, $lte: endDate },
      });

      res.json({
        allProjects,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      console.error(err.message);
    }
  }
});

app.post("/api/projects/create/createProject", verify, async (req, res) => {
  const result = new Project({
    name: req.body.name,
    creator: req.body.creator,
    date: req.body.date,
    updates: req.body.updates,
  });
  try {
    Project.insertMany([result], (err) => {
      console.log(err);
    });
    res.json({ status: "Success" });
  } catch (e) {
    console.log(e);
    res.json({ status: e });
  }
});

app.post("/api/projects/edit/:id", verify, async (req, res) => {
  id = req.params.id;
  let ans = await Project.findOneAndUpdate({ _id: id }, req.body);
  res.send(ans);
});

app.get("/api/projects/delete/:id", verify, async (req, res) => {
  id = req.params.id;
  let ans = await Project.deleteOne({ _id: id });
  res.send(ans);
});

app.post("/login", async function (req, res) {
  let { email, password } = req.body;
  console.log("received", email, password);
  let user = await User.findOne({ email: email });

  if (!user) {
    res.send({ status: "NotFound" });
  } else {
    let valid = await user.validatePassword(password);
    if (valid) {
      let token = jwt.sign(
        { id: user.email, permission: true },
        process.env.SECRET,
        { expiresIn: "7d" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.send({ status: "Success" });
    } else {
      console.log("incorrect password");
      res.send({ status: "WrongPassword" });
    }
  }
});

app.post("/register", async function (req, res) {
  let user = new User(req.body);
  let previousUser = await User.findOne({ email: user.email });
  if (previousUser) {
    res.json({ status: "User already exists" });
  } else {
    user.password = user.encryptPassword(user.password);

    await user.save();

    res.json({ status: "Success" });
  }
});

app.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({ status: "Success" });
});

module.exports = app;
