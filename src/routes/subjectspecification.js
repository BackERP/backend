var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjectspecificationController = require('../controllers/subjectspecification');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  subjectspecificationController.get);
router.get('/list', subjectspecificationController.list);

router.post('/create', authenticateJWT, subjectspecificationController.create);
router.post('/update', authenticateJWT, subjectspecificationController.update);
router.post('/remove', authenticateJWT, subjectspecificationController.remove);




module.exports = router;