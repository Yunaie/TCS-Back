const express = require('express');
const bodyParser = require('body-parser');
const commentaire = require('../models/commentaire');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { createCommentaire,getCommentairesByArticle,getCommentairesByUser,getCommentaires,deleteCommentaire } = require('../controllers/commentaire');

router.post('/', createCommentaire);
router.get('/', getCommentaires);
router.post('/article',getCommentairesByArticle)
router.post('/user',getCommentairesByUser)
router.delete('/:id', deleteCommentaire)


module.exports = router;
