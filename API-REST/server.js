// Import dependencies
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import morgan from "morgan";
import ndmon from "nodemon";

//const express = require("express");
//const cors    = require("cors");
//const db      = require("./app/models");
//let morgan    = require("morgan");
//let ndmon     = require("nodemon");
const app     = express();

app.use(cors());          // cors configuration (access control)
app.use(express.json()); // Analyze content type requests - application/json
app.use(express.urlencoded({ extended: true })); // Analyze content type requests- application/x-www-form-urlencoded
app.use(morgan('dev'));


// In production
// Synchronize all models
await db.sequelize.sync({alter: true}) // (This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.)
  .then(() => {
      console.log("Synced db.");
  })
  .catch((err) => {
      console.log("Failed to sync db: " + err.message);
  });
// Developing (This creates the table, dropping it first if it already existed)
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Add routes to the server
import userRouter     from "./app/routes/user.routes.js";
import clientRouter   from "./app/routes/client.routes.js";
import providerRouter from "./app/routes/provider.routes.js";

app.use('/apiV1/user',     userRouter);
app.use('/apiV1/client',   clientRouter);
app.use('/apiV1/provider', providerRouter);
//require("./app/routes/user.routes")(app);
//require("./app/routes/client.routes")(app);
//require("./app/routes/provider.routes")(app);

// Main route
app.get("/apiV1/", (req, res) => {
  res.json({ message: "Welcome to search to basic services!" });
});

// Configure ports
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
