var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjecttypesController = require('../controllers/subjecttypes');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  subjecttypesController.get);
router.get('/list',  subjecttypesController.list);

router.post('/create', authenticateJWT, subjecttypesController.create);
router.post('/update', authenticateJWT, subjecttypesController.update);
router.post('/remove', authenticateJWT, subjecttypesController.remove);




module.exports = router;