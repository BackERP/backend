var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const offersController = require('../controllers/offers');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', offersController.get);
router.get('/list', offersController.list);

router.post('/create', authenticateJWT, offersController.create);
router.post('/update', authenticateJWT, offersController.update);
router.post('/remove', authenticateJWT, offersController.remove);

router.post('/createByAsset', authenticateJWT, offersController.createByAsset);







module.exports = router;