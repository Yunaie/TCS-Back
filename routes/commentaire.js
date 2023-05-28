const express = require('express');

const router = express.Router();
const { createCommentaire,getCommentairesByArticle,getCommentairesByUser,getCommentaires,deleteCommentaire } = require('../controllers/commentaire');
const middleware = require('../middleware/auth')

router.post('/', createCommentaire);
router.get('/', getCommentaires);
router.post('/article',getCommentairesByArticle)
router.post('/user',getCommentairesByUser)
router.delete('/:id', middleware.adminMiddleware, deleteCommentaire)


module.exports = router;
