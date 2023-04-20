var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const documentContactsController = require('../controllers/documentcontacts');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', documentContactsController.get);
router.get('/list', documentContactsController.list);

router.post('/create', authenticateJWT, documentContactsController.create);
router.post('/update', authenticateJWT, documentContactsController.update);
router.post('/remove', authenticateJWT, documentContactsController.remove);



module.exports = router;