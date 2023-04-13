const jwt = require("jsonwebtoken");
const { createError } = require('../utils/error.js');

/*const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Vous n'êtes pas authentifié!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(createError(401, "Le token est expiré!"));
      } else {
        return next(createError(401, "Token non valide!"));
      }
    }
    req.user = decoded.user;
    next();
  });
};*/

const verifyUser = (req, res, next) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    next();
  } else {
    return next(createError(403, "Vous n'êtes pas autorisé!"));
  }
};

const verifyAdmin = (req, res, next) => {
  console.log(req.body.isAdmin); // vérifier la valeur de req.user
  if (req.body && req.body.isAdmin) {
    next();
  } else {
    return next(createError(403, "Vous n'êtes pas autorisé!"));
  }
};


module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
