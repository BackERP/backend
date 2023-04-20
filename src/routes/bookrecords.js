
var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const bookRecordsController = require('../controllers/bookrecords');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', bookRecordsController.get);
router.get('/list', bookRecordsController.list);









module.exports = router;