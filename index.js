const sequelize = require("./setup/database");
const userController = require("./controllers/users.controller");
const authController = require("./controllers/auth.controller");
const authenticateToken = require("./middleware/authToken");
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
app.put("/update/:id", authenticateToken, (req, res) => {
  authController.updateUserData(req, res);
});
app.get("/user_data", authenticateToken, (req, res) => {
  authController.getUserData(req, res);
});

app.listen(3000, () => {
  console.log("Le serveur est en cours d'écoute sur le port 3000");
});

console.log(user === sequelize.models.User);
