const UserModel = require("../models/users");
const ObjectID = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");


module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur.' });
  }
};


exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retrieving user information.' });
  }
};




module.exports.LikeAnArticle = async (req, res) => {
  const { id } = req.params;
  const { articleId } = req.body;

  try {
    await UserModel.findByIdAndUpdate(
      id,
      { $addToSet: { likes: articleId } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'L\'article a été aimé avec succès !' });
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports.UnikeAnArticle = async (req, res) => {
  const { id } = req.params;
  const { articleId } = req.body;

  try {
    await UserModel.findByIdAndUpdate(
      id,
      { $pull: { likes: articleId } },
      { new: true }
    );

    res.status(200).json({ message: 'L\'article a été désaimé avec succès !' });
  } catch (err) {
    res.status(500).json(err);
  }
};







module.exports.getUserLike = async (req,res) => {
  const { id } = req.params;

 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur.' });
  }
};




