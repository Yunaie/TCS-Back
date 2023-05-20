const User = require('../models/users');
const Article = require('../models/article');
const Commentaire = require('../models/commentaire');

const createCommentaire = async (req, res) => {
  const { commentaire, createdAt, user, article } = req.body;

  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "Le user spécifié n'existe pas" });
    }
    
    try {
      const existingArticle = await Article.findById(article);
      if (!existingArticle) {
        return res.status(404).json({ message: "L'article spécifié n'existe pas" });
      }

      const newCommentaire = new Commentaire({
        commentaire,
        createdAt,
        user,
        article
      });

      await newCommentaire.save();

      res.status(201).json(newCommentaire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur s'est produite lors de la création du commentaire" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la recherche de l'utilisateur" });
  }
};

const getCommentaires = async (req, res) => {

  try {
    const commentaires = await Commentaire.find();
    res.json(commentaires);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getCommentairesByArticle = async (req, res) => {
  const { article } = req.body; // Assurez-vous que l'ID de l'article est passé dans le corps de la requête

  try {
    const commentaires = await Commentaire.find({ article: article }).exec();
    if (commentaires.length === 0) {
      return res.status(404).json({ message: "Aucun commentaire trouvé pour cet article" });
    }
    res.json(commentaires);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getCommentairesByUser = async (req, res) => {
  const { user } = req.body; // Assurez-vous que l'ID de l'article est passé dans le corps de la requête

  try {
    const commentaires = await Commentaire.find({ user: user }).exec();
    if (commentaires.length === 0) {
      return res.status(404).json({ message: "Aucun commentaire trouvé pour cet user" });
    }
    res.json(commentaires);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteCommentaire = async (req, res) => {
  try {
    const removedCommentaire = await Commentaire.findByIdAndRemove(req.params.id);
    if (removedCommentaire) {
      res.status(200).json({ message: "Commentaire successfully deleted." });
    } else {
      res.status(404).json({ message: "Commentaire not found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};


module.exports = {
  createCommentaire,
  getCommentairesByArticle,
  getCommentairesByUser,
  getCommentaires,
  deleteCommentaire
};
