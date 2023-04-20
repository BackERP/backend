
var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const typeDocumentsController = require('../controllers/typedocuments');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', typeDocumentsController.get);
router.get('/list', typeDocumentsController.list);

router.post('/create', authenticateJWT, typeDocumentsController.create);
router.post('/update', authenticateJWT, typeDocumentsController.update);
router.post('/remove', authenticateJWT, typeDocumentsController.remove);



module.exports = router;