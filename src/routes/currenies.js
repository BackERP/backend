var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const curreniesController = require('../controllers/currenies');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', curreniesController.get);
router.get('/list', curreniesController.list);

router.post('/create', authenticateJWT, curreniesController.create);
router.post('/update', authenticateJWT, curreniesController.update);
router.post('/remove', authenticateJWT, curreniesController.remove);






module.exports = router;