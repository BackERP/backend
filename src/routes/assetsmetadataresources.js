var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const assetsmetadataresourcesController = require('../controllers/assetsmetadataresources');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  assetsmetadataresourcesController.get);
router.get('/list', assetsmetadataresourcesController.list);

router.post('/create', authenticateJWT, assetsmetadataresourcesController.create);
router.post('/update', authenticateJWT, assetsmetadataresourcesController.update);
router.post('/remove', authenticateJWT, assetsmetadataresourcesController.remove);




module.exports = router;