var express = require('express');
const { listCustomer, readCustomer, addCustomer, editCustomer, deleteCustomer } = require('../controllers/customerController');
var router = express.Router();



router.get('/', listCustomer)          //show all Customer
router.get('/:id', readCustomer)       //show  Customer with id
router.post('/', addCustomer)          // Add Customer
router.put('/:id', editCustomer)        // Edit Customer
router.delete('/:id', deleteCustomer)   // Delete Customer




module.exports = router;


/* { 
    "name": "TEST2", 
    "email": "test13@gmail.com", 
    "phone": "999998888" 
    } */