var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const orderSpecificationController = require('../controllers/orderspecification');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', orderSpecificationController.get);
router.get('/list', orderSpecificationController.list);

router.post('/create', authenticateJWT, orderSpecificationController.create);
router.post('/update', authenticateJWT, orderSpecificationController.update);
router.post('/remove', authenticateJWT, orderSpecificationController.remove);






module.exports = router;