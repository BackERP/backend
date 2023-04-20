var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const marketsController = require('../controllers/markets');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', marketsController.get);
router.get('/list', marketsController.list);

router.post('/create', authenticateJWT, marketsController.create);
router.post('/update', authenticateJWT, marketsController.update);
router.post('/remove', authenticateJWT, marketsController.remove);



module.exports = router;