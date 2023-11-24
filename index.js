const sequelize = require("./setup/database");
require("dotenv").config();
const userRouter = require("./controllers/users.controller");
const authUser = require("./controllers/auth.controller"); 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/user", userRouter);
app.use("/user_action", authUser);

app.listen(3000, () => {
  console.log("Le serveur est en cours d'écoute sur le port 3000");
});

module.exports = app