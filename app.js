const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

// Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// DB
const db = require("./db");

// Routes required
const pastaRoutes = require("./routes/pastas");
const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
app.use("/pastas", pastaRoutes);
app.use("/shops", shopRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();

    console.log("Connection to database successful");
  } catch (error) {
    console.log("🚀 ~ file: app.js ~ line 23 ~ run ~ error", error);
  }
};
run();
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
