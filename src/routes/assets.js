var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const assetsController = require('../controllers/assets');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', assetsController.get);
router.get('/list',  assetsController.list);
router.get('/person',  assetsController.person);

router.post('/create', authenticateJWT, assetsController.create);
router.post('/update', authenticateJWT, assetsController.update);
router.post('/remove', authenticateJWT, assetsController.remove);




module.exports = router;