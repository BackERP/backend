var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const assetmarketController = require('../controllers/assetmarket');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', assetmarketController.get);





module.exports = router;