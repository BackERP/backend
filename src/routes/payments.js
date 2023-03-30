var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const paymentsController = require('../controllers/payments');
//import authenticateJWT from  '../controllers/authenticateJWT';

router.post('/paid',  paymentsController.paid);





module.exports = router;