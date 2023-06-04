const express = require('express');
const bodyParser = require('body-parser');
const criminel = require('../models/criminel');

const router = express.Router();
const { createCriminel, getCriminals,deleteCriminals,getCriminelById } = require('../controllers/criminel');
const {checkUser, requireAdmin} = require('../middleware/auth');


router.post('/',checkUser, requireAdmin, createCriminel);
router.get('/', getCriminals);
router.delete('/:id',checkUser, requireAdmin,deleteCriminals);
router.get('/:id',getCriminelById);

module.exports = router;
