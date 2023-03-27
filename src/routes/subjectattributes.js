var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjectattributesController = require('../controllers/subjectattributes');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  subjectattributesController.get);
router.get('/list', subjectattributesController.list);

router.post('/create', authenticateJWT, subjectattributesController.create);
router.post('/update', authenticateJWT, subjectattributesController.update);
router.post('/remove', authenticateJWT, subjectattributesController.remove);






module.exports = router;