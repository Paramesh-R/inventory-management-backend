var express = require('express');
const { listSales,
    readSales,
    addSales,
} = require('../controllers/salesController');
var router = express.Router();


router.get('/', listSales)          //show all Sales
router.get('/:id', readSales)       //show  Sales with id
router.post('/', addSales)          // Add Sales

module.exports = router;