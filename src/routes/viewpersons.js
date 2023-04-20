var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const viewPersonsController = require('../controllers/viewpersons');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  viewPersonsController.get);
router.post('/save', authenticateJWT, viewPersonsController.save);




module.exports = router;