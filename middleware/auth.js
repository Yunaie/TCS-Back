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

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token');
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
    res.sendStatus(401);
  }
};

module.exports.adminMiddleware = (req, res, next) => {
  // Vérifier si l'utilisateur est un administrateur
  if (req.user && req.user.isAdmin) {
    // L'utilisateur est un administrateur, passer au middleware suivant
    next();
  } else {
    // L'utilisateur n'est pas un administrateur, renvoyer une réponse d'erreur
    res.status(403).json({ error: 'Accès refusé. Vous devez être administrateur.' });
  }
};
