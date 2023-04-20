var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjectTypeContactsController = require('../controllers/subjecttypecontacts');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', subjectTypeContactsController.get);
router.get('/list', subjectTypeContactsController.list);

router.post('/create', authenticateJWT, subjectTypeContactsController.create);
router.post('/update', authenticateJWT, subjectTypeContactsController.update);
router.post('/remove', authenticateJWT, subjectTypeContactsController.remove);



module.exports = router;