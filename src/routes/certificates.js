var express = require('express');
//import authController from '../controllers';
var router = express.Router({mergeParams: true});

const certificatesController = require('../controllers/certificates');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/paid', certificatesController.paid);

//req.params.id






module.exports = router;