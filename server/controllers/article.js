const { ObjectId } = require('mongoose').Types;
const Article = require('../models/article');
const Crime = require('../models/crime');

const createArticle = async (req, res) => {
  const { titre, description, markdown, crime,picture } = req.body;

  try {
    const existingCrime = await Crime.findById(crime);
    if (!existingCrime) {
      return res.status(404).json({ message: "Le crime spécifié n'existe pas" });
    }

    const newArticle = new Article({
      titre,
      description,
      markdown,
      crime,
      picture
    });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'article" });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('crime');
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteArticle = async (req, res) => {
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
};

const getLatestArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 }) // Trier par ordre décroissant de la date de création
      .limit(4); // Limiter le nombre d'articles à 4

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des articles' });
  }
};

async function getArticleById(req, res) {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createArticle,
  getArticles,
  deleteArticle,
  getLatestArticles,
  getArticleById
};
