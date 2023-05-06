const ObjectID = require("mongoose").Types.ObjectId;
const Article = require('../models/article');
const Crime = require('../models/crime');

// Créer un nouvel article avec l'ID d'un crime existant en tant que référence
const createArticle = async (req, res) => {
  const { titre, description, markdown, crimeId } = req.body;

  try {
    // Vérifier si le crime existe
    const existingCrime = await Crime.findById(crimeId);
    if (!existingCrime) {
      return res.status(404).json({ message: "Le crime spécifié n'existe pas" });
    }

    // Créer le nouvel article
    const newArticle = new Article({
      titre,
      description,
      markdown,
      crime: existingCrime._id // Utiliser l'ID du crime existant comme référence
    });

    // Enregistrer le nouvel article dans la base de données
    await newArticle.save();

    // Répondre avec le nouvel article créé
    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'article" });
  }
};






async function getArticles(req, res) {
  try {
    const articles = await Article.find().populate('crime');
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function deleteArticle(req,res) {
  try {
      const removedArticle = await Article.findByIdAndRemove(req.params.id);
      if (removedArticle) {
          res.status(200).json({ message: "Article successfully deleted." });
      } else {
          res.status(404).json({ message: "Article not found." });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).send(error);
  }
}

module.exports = {
  createArticle,
  getArticles,
  deleteArticle
};
