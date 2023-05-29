const router = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');


// auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);

// user 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/like/:id', userController.LikeAnArticle);
router.put('/unlike/:id', userController.UnikeAnArticle);
router.get('/like/:id', userController.getUserLike);
router.get('/mail/:email', userController.getUserByEmail);
router.put("/bio/:id", userController.updateBio);
router.put("/picture/:id", userController.updatePicture);
router.delete('/:id', userController.deleteUser);

module.exports = router;