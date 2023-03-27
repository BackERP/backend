var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const orderStatesController = require('../controllers/orderstates');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', orderStatesController.get);
router.get('/list', orderStatesController.list);







module.exports = router;