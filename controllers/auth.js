const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/error');
const getUserByEmail = require('./user');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signUp = async (req, res) => {
  const { username, email, password, Admin } = req.body;

  try {
    const user = await UserModel.create({
      username,
      email,
      password,
      Admin: Admin === "true" ? true : false
    });
    res.status(201).json({ message: "Successfully registered." });

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
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ message: 'Successfully logged in.' });
  } catch (err) {
    console.log(err);
    res.status(401).json({ errors: [{ message: 'Invalid credentials.' }] });
  }
};



