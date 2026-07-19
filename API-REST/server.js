// Import dependences
//const express = require("express");
//const cors    = require("cors");
//const db      = require("./app/models");
//let morgan    = require("morgan");
//let ndmon     = require("nodemon");
import "dotenv/config"; // Load environment variables before importing the database configuration
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import morgan from "morgan";

// Add routes to the server
import clientRouter     from "./app/routes/client.routes.js";
import providerRouter   from "./app/routes/provider.routes.js";
import experienceRouter from "./app/routes/experience.routes.js";
import opinionRouter    from "./app/routes/opinion.routes.js";

const app = express();

app.use(cors());          // cors configuration (access control)
app.use(express.json()); // Analyze content type requests - application/json
app.use(express.urlencoded({ extended: true })); // Analyze content type requests- application/x-www-form-urlencoded
app.use(morgan('dev'));

// Set routes.
app.use('/apiV1/client',     clientRouter);
app.use('/apiV1/provider',   providerRouter);
app.use('/apiV1/experience', experienceRouter);
app.use('/apiV1/opinion',    opinionRouter)
//require("./app/routes/user.routes")(app);
//require("./app/routes/client.routes")(app);
//require("./app/routes/provider.routes")(app);

// Main route.
app.get("/apiV1/", (req, res) => {
  res.json({ message: "Welcome to search to basic services!" });
});

// Configure ports
const PORT = process.env.PORT || 8080;


// In production
// Synchronize all models
try {

  await db.sequelize.authenticate();
  console.log("Database connection established successfully.");

  await db.sequelize.sync({ alter: true }); // This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
  console.log("Synced db.");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

} catch (error) {
  console.error("Failed to initialize the database:", error.message);
  process.exit(1);
}

//await db.sequelize.sync({alter: true}) 
//  .then(() => {
//      console.log("Synced db.");
//  })
//  .catch((err) => {
//      console.log("Failed to sync db: " + err.message);
//  });
//
// Developing (This creates the table, dropping it first if it already existed)
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });




