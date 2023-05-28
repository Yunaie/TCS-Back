const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/error');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // Durée de vie d'une semaine en millisecondes

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge,
      secure: true // Utilisation du protocole HTTPS uniquement
    });

    res.status(200).json({ _id: user._id, Admin: user.Admin });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(400).json({ errors });
  }
};


module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}