var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const accountsubjectsController = require('../controllers/accountsubjects');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', authenticateJWT, accountsubjectsController.get);
router.get('/list', authenticateJWT, accountsubjectsController.list);

router.post('/create', authenticateJWT, accountsubjectsController.create);
router.post('/update', authenticateJWT, accountsubjectsController.update);
router.post('/remove', authenticateJWT, accountsubjectsController.remove);




module.exports = router;