const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const saltRounds = bcrypt.genSaltSync(10);
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = await User.create({
      email,
      username,
      password: bcrypt.hashSync(password + process.env.HASH_KEY, saltRounds),
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Impossible de créer l'utilisateur" });
  }
};

const getUser = async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = await User.findOne({
      where: {
        username
      },
      // [Op.or]: [
      //   { username: username },
      //   { email: email },
      // ],
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
      return res.status(201).json({ token });
    } else {
      return res
        .status(401)
        .send({ message: "username ou mot de passe incorrect" });
    }
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = { createUser, getUser };
