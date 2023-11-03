const sequelize = require("../setup/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {}
);
User.sync()
  .then(() => {
    console.log("Le modèle User a été synchronisé avec la base de données.");
  })
  .catch((err) => {
    console.error("Erreur lors de la synchronisation du modèle User :", err);
  });

module.exports = User;
