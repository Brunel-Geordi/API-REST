const User = require("../models/users.model");
require("dotenv").config();

const updateUserData = async (req, res) => {
  try {
    const userId = req.user.ID;
    const { username } = req.body;
    console.log(userId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    user.username = username;
    await user.save();
    res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.user.ID;
    const user = await User.findByPk(userId, {
      attributes: ["username", "createdAt"],
    });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

module.exports = { updateUserData, getUserData };
