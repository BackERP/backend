var express = require('express');
//import authController from '../controllers';
var router = express.Router();


const localesController = require('../controllers/locales');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', localesController.get);
router.get('/list', localesController.list);

router.post('/create', authenticateJWT, localesController.create);
router.post('/update', authenticateJWT, localesController.update);
router.post('/remove', authenticateJWT, localesController.remove);



module.exports = router;