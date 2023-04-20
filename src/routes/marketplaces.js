var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const marketPlacesController = require('../controllers/marketplaces');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', marketPlacesController.get);
router.get('/list', marketPlacesController.list);

router.post('/create', authenticateJWT, marketPlacesController.create);
router.post('/update', authenticateJWT, marketPlacesController.update);
router.post('/remove', authenticateJWT, marketPlacesController.remove);



module.exports = router;