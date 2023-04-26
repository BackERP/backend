var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const operationsController = require('../controllers/operations');
import authenticateJWT from  '../controllers/authenticateJWT';
import authenticateEmptyJWT from '../controllers/authenticateEmptyJWT';

router.post('/issueAll', authenticateJWT, operationsController.issueAll);
router.post('/issue', authenticateJWT, operationsController.issue);
router.post('/income', authenticateJWT, operationsController.issueAll);
router.post('/incomeAll', authenticateJWT, operationsController.issue);


router.post('/makeOffer', authenticateJWT, operationsController.makeOffer);
router.post('/makeReserve', authenticateJWT, operationsController.makeReserve);
router.post('/freeReserve', authenticateJWT, operationsController.freeReserve);

router.post('/makeOrder', authenticateEmptyJWT, operationsController.makeOrder);
router.post('/makePaid', authenticateEmptyJWT, operationsController.makePaid);
router.post('/makeReturn', authenticateEmptyJWT, operationsController.makeReturn);





module.exports = router;