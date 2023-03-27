var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const typerelationsController = require('../controllers/typerelations');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  typerelationsController.get);
router.get('/list', typerelationsController.list);

router.post('/create', authenticateJWT, typerelationsController.create);
router.post('/update', authenticateJWT, typerelationsController.update);
router.post('/remove', authenticateJWT, typerelationsController.remove);




module.exports = router;