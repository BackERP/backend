var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const assetsprovidersController = require('../controllers/assetsproviders');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  assetsprovidersController.get);
router.get('/list',  assetsprovidersController.list);
router.post('/create', authenticateJWT, assetsprovidersController.create);
router.post('/update', authenticateJWT, assetsprovidersController.update);
router.post('/remove', authenticateJWT, assetsprovidersController.remove);




module.exports = router;