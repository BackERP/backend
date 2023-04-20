var express = require('express');
//import authController from '../controllers';
var router = express.Router();


const languagesController = require('../controllers/languages');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', languagesController.get);
router.get('/list', languagesController.list);

router.post('/create', authenticateJWT, languagesController.create);
router.post('/update', authenticateJWT, languagesController.update);
router.post('/remove', authenticateJWT, languagesController.remove);



module.exports = router;