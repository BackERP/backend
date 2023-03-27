var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const personaccountsController = require('../controllers/personaccounts');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', authenticateJWT, personaccountsController.get);
router.get('/list', authenticateJWT, personaccountsController.list);

router.post('/create', authenticateJWT, personaccountsController.create);
router.post('/update', authenticateJWT, personaccountsController.update);
router.post('/remove', authenticateJWT, personaccountsController.remove);




module.exports = router;