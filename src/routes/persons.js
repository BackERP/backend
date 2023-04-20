var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const personsController = require('../controllers/persons');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get',  personsController.get);
router.get('/list',  personsController.list);
router.get('/representations',  personsController.representations);


router.post('/create', authenticateJWT, personsController.create);
router.post('/update', authenticateJWT, personsController.update);
router.post('/remove', authenticateJWT, personsController.remove);





module.exports = router;