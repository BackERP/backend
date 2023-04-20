var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const viewSubjectsController = require('../controllers/viewsubjects');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  viewSubjectsController.get);
router.post('/save', authenticateJWT, viewSubjectsController.save);




module.exports = router;