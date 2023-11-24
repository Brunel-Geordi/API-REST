const User = require("../models/users.model");
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authToken");

router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const { username } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    user.username = username;
    await user.save();
    res.status(204).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res
      .status(401)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const user = await User.findByPk(userId);
    await user.destroy();

    res.status(204).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

router.get("/data", authenticateToken, async (req, res) => {
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
      .status(404)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

module.exports = router
