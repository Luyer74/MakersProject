const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

app.listen(process.env.PORT, () => console.log("Server up!"));
