var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const offerSpecificationController = require('../controllers/offerspecification');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', offerSpecificationController.get);
router.get('/list', offerSpecificationController.list);

router.post('/create', authenticateJWT, offerSpecificationController.create);
router.post('/update', authenticateJWT, offerSpecificationController.update);
router.post('/remove', authenticateJWT, offerSpecificationController.remove);






module.exports = router;