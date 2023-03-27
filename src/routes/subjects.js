var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjectsController = require('../controllers/subjects');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  subjectsController.get);
router.get('/list',  subjectsController.list);

router.post('/create', authenticateJWT, subjectsController.create);
router.post('/update', authenticateJWT, subjectsController.update);
router.post('/remove', authenticateJWT, subjectsController.remove);




module.exports = router;