var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const ordersController = require('../controllers/orders');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', ordersController.get);
router.get('/list', ordersController.list);

router.post('/create', authenticateJWT, ordersController.create);
router.post('/update', authenticateJWT, ordersController.update);
router.post('/remove', authenticateJWT, ordersController.remove);

router.post('/createByRegistr', ordersController.createByRegistr);







module.exports = router;