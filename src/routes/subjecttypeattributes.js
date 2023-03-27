var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const subjecttypeattributesController = require('../controllers/subjecttypeattributes');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  subjecttypeattributesController.get);
router.get('/list',  subjecttypeattributesController.list);

router.post('/create', authenticateJWT, subjecttypeattributesController.create);
router.post('/update', authenticateJWT, subjecttypeattributesController.update);
router.post('/remove', authenticateJWT, subjecttypeattributesController.remove);






module.exports = router;