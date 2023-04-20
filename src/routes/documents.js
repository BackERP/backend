
var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const documentsController = require('../controllers/documents');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', documentsController.get);
router.get('/list', documentsController.list);

router.post('/create', authenticateJWT, documentsController.create);
router.post('/update', authenticateJWT, documentsController.update);
router.post('/remove', authenticateJWT, documentsController.remove);







module.exports = router;