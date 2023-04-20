var express = require('express');
//import authController from '../controllers';
var router = express.Router();


const countriesController = require('../controllers/countries');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', countriesController.get);
router.get('/list', countriesController.list);

router.post('/create', authenticateJWT, countriesController.create);
router.post('/update', authenticateJWT, countriesController.update);
router.post('/remove', authenticateJWT, countriesController.remove);



module.exports = router;