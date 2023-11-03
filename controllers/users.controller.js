const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password + process.env.HASH_KEY, saltRounds),
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de créer l'utilisateur" });
  }
};

const getUser = async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res
        .status(404)
        .send({ message: "username ou mot de passe incorrect" });
    }
    const verify = bcrypt.compareSync(
      password + process.env.HASH_KEY,
      user.password
    );
    if (verify) {
      const token = jwt.sign({ ID: user.ID }, secretKey, { expiresIn: "1h" });
      return res.status(201).json({ token });
    } else {
      return res
        .status(401)
        .send({ message: "username ou mot de passe incorrect" });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { createUser, getUser };
