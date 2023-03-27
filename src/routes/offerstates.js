var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const offerStatesController = require('../controllers/offerstates');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', offerStatesController.get);
router.get('/list', offerStatesController.list);







module.exports = router;