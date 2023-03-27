var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const assetsmetadataprovidersController = require('../controllers/assetsmetadataproviders');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', assetsmetadataprovidersController.get);
router.get('/list',  assetsmetadataprovidersController.list);

router.post('/create', authenticateJWT, assetsmetadataprovidersController.create);
router.post('/update', authenticateJWT, assetsmetadataprovidersController.update);
router.post('/remove', authenticateJWT, assetsmetadataprovidersController.remove);




module.exports = router;