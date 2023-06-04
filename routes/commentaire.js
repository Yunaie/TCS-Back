const express = require('express');

const router = express.Router();
const { createCommentaire,getCommentairesByArticle,getCommentairesByUser,getCommentaires,deleteCommentaire } = require('../controllers/commentaire');
const {checkUser, requireAdmin} = require('./middleware/auth');


router.post('/',checkUser, createCommentaire);
router.get('/', getCommentaires);
router.post('/article',getCommentairesByArticle)
router.post('/user',getCommentairesByUser)
router.delete('/:id',checkUser,requireAdmin, deleteCommentaire)


module.exports = router;
