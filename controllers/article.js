const Crime = require('../models/article');

async function createArticle(req, res) {
    try {
        const allArticle = await article.find();
        res.json(allArticle);
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while getting the articles.' });
      }
}

async function getArticles(req, res) {
   try {
      const allArticle = await article.find();
      res.json(allArticle);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'An error occurred while getting the articles.' });
    }
}

async function deleteArticles(req,res) {
 
    try {
        const removedArticle = await article.findByIdAndRemove({ _id: req.params.id });
        res.status(201).json({ message: "Article successfully deleted." });
      } catch (error) {
        console.log(error);
        return res.status(404).send(error);
      }
}


module.exports = {
  createArticle,
  getArticles,
  deleteArticles
};
