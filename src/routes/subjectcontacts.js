var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjectContactsController = require('../controllers/subjectcontacts');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', subjectContactsController.get);
router.get('/list', subjectContactsController.list);

router.post('/create', authenticateJWT, subjectContactsController.create);
router.post('/update', authenticateJWT, subjectContactsController.update);
router.post('/remove', authenticateJWT, subjectContactsController.remove);



module.exports = router;