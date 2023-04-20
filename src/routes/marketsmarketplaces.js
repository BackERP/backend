var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const marketsMarketPlacesController = require('../controllers/marketsmarketplaces');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', marketsMarketPlacesController.get);
router.get('/list', marketsMarketPlacesController.list);

router.post('/create', authenticateJWT, marketsMarketPlacesController.create);
router.post('/update', authenticateJWT, marketsMarketPlacesController.update);
router.post('/remove', authenticateJWT, marketsMarketPlacesController.remove);



module.exports = router;