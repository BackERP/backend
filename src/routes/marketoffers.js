var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const marketOffersController = require('../controllers/marketoffers');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', marketOffersController.get);
router.get('/list', marketOffersController.list);

router.post('/create', authenticateJWT, marketOffersController.create);
router.post('/update', authenticateJWT, marketOffersController.update);
router.post('/remove', authenticateJWT, marketOffersController.remove);



module.exports = router;