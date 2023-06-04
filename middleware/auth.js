const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(200).json('no token');
      } else {
        console.log(decodedToken.id);
        if (decodedToken.admin) {
          next(); // Passer à la prochaine fonction middleware
        } else {
          res.sendStatus(401); // Non autorisé si l'utilisateur n'est pas administrateur
        }
      }
    });
  } else {
    console.log('No token');
    res.sendStatus(401);
  }
};

