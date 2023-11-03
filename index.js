const sequelize = require("./setup/database");
const userController = require("./controllers/users.controller");
const user = require("./models/users.model");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// ... Autres configurations Express ...

app.use(bodyParser.json()); // Pour les données JSON
app.use(bodyParser.urlencoded({ extended: true })); // Pour les données de formulaire

app.post("/user", (req, res) => {
  userController.createUser(req, res);
});
app.get("/login", (req, res) => {
  userController.getUser(req, res);
});

// ... Autres routes ...

// Écoutez sur un port
app.listen(3000, () => {
  console.log("Le serveur est en cours d'écoute sur le port 3000");
});

console.log(user === sequelize.models.User);
