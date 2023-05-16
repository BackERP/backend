var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const testMailController = require('../controllers/testmail');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/send', testMailController.send);

//req.params.id






module.exports = router;