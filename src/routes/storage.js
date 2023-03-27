var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const storageController = require('../controllers/storage');
import authenticateJWT from  '../controllers/authenticateJWT';

router.post('/testAuthStorage', authenticateJWT,storageController.testAuthStorage);
//router.get('/test_upload', )
router.post('/upload', authenticateJWT, storageController.upload);
router.get('/setmetadata', authenticateJWT, storageController.setMetadata);
router.post('/uploadFile', storageController.uploadFile);







module.exports = router;