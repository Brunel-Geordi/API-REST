const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const saltRounds = bcrypt.genSaltSync(10);
const secretKey = process.env.SECRET_KEY;

router.post("/create", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    await User.create({
      email,
      username,
      password: bcrypt.hashSync(password + process.env.HASH_KEY, saltRounds),
    });
    res.status(201).json({ message: "Utilisateur créer avec succes" });
  } catch (error) {
    res.status(422).json({ message: "Impossible de créer l'utilisateur" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res
        .status(401)
        .send({ message: "username ou mot de passe incorrect" });
    }
    const verify = bcrypt.compareSync(
      password + process.env.HASH_KEY,
      user.password
    );
    if (verify) {
      const token = jwt.sign({ ID: user.ID }, secretKey, { expiresIn: "1h" });
      return res.status(200).json({ token });
    } else {
      return res
        .status(401)
        .send({ message: "username ou mot de passe incorrect" });
    }
  } catch (error) {
    res.sendStatus(400);
  }
});
module.exports = router;
