const express = require('express');
const router = express.Router();
const LoanController = require('../controllers/LoanController');

router.post('/loans', LoanController.create);
router.get('/loans', LoanController.findAll);
router.put('/loans/:id/return', LoanController.returnBook);
router.get('/loans/overdue', LoanController.getOverdueLoans);

module.exports = router;