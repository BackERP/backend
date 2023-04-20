var express = require('express');
//import authController from '../controllers';
var router = express.Router();

const booksController = require('../controllers/books');
import authenticateJWT from  '../controllers/authenticateJWT';

router.get('/get', booksController.get);
router.get('/list', booksController.list);

router.post('/create', authenticateJWT, booksController.create);
router.post('/update', authenticateJWT, booksController.update);
router.post('/remove', authenticateJWT, booksController.remove);









module.exports = router;