var express = require('express');
//import authController from '../controllers';
var router = express.Router();


const regionsController = require('../controllers/regions');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', regionsController.get);
router.get('/list', regionsController.list);

router.post('/create', authenticateJWT, regionsController.create);
router.post('/update', authenticateJWT, regionsController.update);
router.post('/remove', authenticateJWT, regionsController.remove);



module.exports = router;