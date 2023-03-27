var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const persondetailsController = require('../controllers/persondetails');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  persondetailsController.get);
router.get('/list',  persondetailsController.list);

router.post('/create', authenticateJWT, persondetailsController.create);
router.post('/update', authenticateJWT, persondetailsController.update);
router.post('/remove', authenticateJWT, persondetailsController.remove);




module.exports = router;