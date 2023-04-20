var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const viewAssetsController = require('../controllers/viewassets');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  viewAssetsController.get);
router.post('/save', authenticateJWT, viewAssetsController.save);




module.exports = router;