require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }
  const token = header.split (' ')[1]
  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Token non valide" });
    }
    req.user = user;
    console.log(user)
    next();
  });
};

module.exports =  authenticateToken ;
