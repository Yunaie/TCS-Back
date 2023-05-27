const express = require('express');
const bodyParser = require('body-parser');
const criminel = require('../models/criminel');

const router = express.Router();
const { createCriminel, getCriminals,deleteCriminals } = require('../controllers/criminel');
const {verifyJWT} = require('../controllers/auth')

router.use(verifyJWT);
router.post('/', createCriminel);
router.get('/', getCriminals);
router.delete('/:id',deleteCriminals);

module.exports = router;
