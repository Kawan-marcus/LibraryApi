const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.post('/books', BookController.create);
router.get('/books', BookController.findAll);
router.get('/books/:id', BookController.findOne);
router.put('/books/:id', BookController.update);
router.delete('/books/:id', BookController.delete);

module.exports = router;