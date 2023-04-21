var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const helperController = require('../controllers/helper');

//router.get('/test_upload', )
router.get('/minimizeImages', helperController.minimizeImages);







module.exports = router;