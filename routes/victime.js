const express = require('express');
const bodyParser = require('body-parser');
const victime = require('../models/victime');

const router = express.Router();
const { createVictim, getVictim,deleteVictim,getVictimeById } = require('../controllers/victime');
const {checkUser, requireAdmin} = require('../middleware/auth');


router.post('/',checkUser, requireAdmin, createVictim);
router.get('/', getVictim);
router.delete('/:id',checkUser, requireAdmin,deleteVictim);
router.get('/:id',getVictimeById);

module.exports = router;
