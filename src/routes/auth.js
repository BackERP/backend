var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const authController = require('../controllers/auth');
import authenticateJWT from  '../controllers/authenticateJWT';

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/token', authController.token);


module.exports = router;