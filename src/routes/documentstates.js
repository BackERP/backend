
var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const documentStatesController = require('../controllers/documentstates');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', documentStatesController.get);
router.get('/list', documentStatesController.list);

router.post('/create', authenticateJWT, documentStatesController.create);
router.post('/update', authenticateJWT, documentStatesController.update);
router.post('/remove', authenticateJWT, documentStatesController.remove);




module.exports = router;