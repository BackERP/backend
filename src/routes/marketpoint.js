var express = require('express');
//import authController from '../controllers';
var router = express.Router({mergeParams: true});

const marketPointController = require('../controllers/marketpoint');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/main', marketPointController.main);
router.get('/creation', marketPointController.creation);
router.get('/organization', marketPointController.organization);

//req.params.id






module.exports = router;