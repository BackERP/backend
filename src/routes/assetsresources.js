var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const assetsresourcesController = require('../controllers/assetsresources');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  assetsresourcesController.get);
router.get('/list', assetsresourcesController.list);

router.post('/create', authenticateJWT, assetsresourcesController.create);
router.post('/update', authenticateJWT, assetsresourcesController.update);
router.post('/remove', authenticateJWT, assetsresourcesController.remove);




module.exports = router;