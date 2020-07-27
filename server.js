const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

dotenv.config({ path: ".env" });
const app = express();

const studentTransactions = require("./routes.js");

//hook middleware before linking routes
app.use(express.json()); //allows body parsing

//defined the general route
app.use("/api/v1/student", studentTransactions);

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT} `
      .yellow.bold
  )
);