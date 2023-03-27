var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const saleRegistrsController = require('../controllers/saleregistrs');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', saleRegistrsController.get);
router.get('/list', saleRegistrsController.list);






module.exports = router;