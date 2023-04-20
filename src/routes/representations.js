var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const representationsController = require('../controllers/representations');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', representationsController.get);
router.get('/list', representationsController.list);
router.get('/seed', representationsController.seed);
router.get('/seedSubjects', representationsController.seedSubjects);
router.get('/seedPersons', representationsController.seedPersons);
router.get('/seedAssets', representationsController.seedAssets);















module.exports = router;