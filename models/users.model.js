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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: false,
          msg: "Format email incorrect"
        }
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 4,
      }
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        min: 6,
      }
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
