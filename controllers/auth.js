const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const { signUpErrors } = require('../utils/error');


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};

const verifyJWT = (req, res, next) => {
  // Récupérer le jeton d'authentification du header, du cookie ou du corps de la requête
  const token = req.headers.authorization || req.cookies.token || req.body.token;

  // Vérifier si le jeton existe
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Vérifier la validité du jeton en utilisant la clé secrète
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Ajouter les données du jeton décodé à la requête
    req.user = decoded;

    // Passer à la prochaine fonction middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyJWT;


module.exports.signUp = async (req, res) => {
  const { username, email, password, Admin } = req.body;

  try {
    const user = await UserModel.create({
      username,
      email,
      password,
      Admin: Admin === 'true' ? true : false
    });
    res.status(201).json({ message: 'Successfully registered.' });
  } catch (err) {
    console.log(err);
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true, maxAge });
    res.status(200).json({ message: 'Successfully logged in.' });
  } catch (err) {
    console.log(err);
    res.status(401).json({ errors: [{ message: 'Invalid credentials.' }] });
  }
};



