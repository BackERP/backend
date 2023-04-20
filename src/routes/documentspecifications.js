
var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const documentSpecificationsController = require('../controllers/documentspecifications');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', documentSpecificationsController.get);
router.get('/list', documentSpecificationsController.list);

router.post('/create', authenticateJWT, documentSpecificationsController.create);
router.post('/update', authenticateJWT, documentSpecificationsController.update);
router.post('/remove', authenticateJWT, documentSpecificationsController.remove);


module.exports = router;