var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const buyRegistrsController = require('../controllers/buyregistrs');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', buyRegistrsController.get);
router.get('/list', buyRegistrsController.list);







module.exports = router;