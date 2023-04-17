var express = require('express');
const { listProduct,
    readProduct,
    addProduct,
    editProduct,
    deleteProduct } = require('../controllers/productController');
var router = express.Router();


router.get('/', listProduct)          //show all Product
router.get('/:id', readProduct)       //show  Product with id
router.post('/', addProduct)          // Add Product
router.put('/:id', editProduct)        // Edit Product
router.delete('/:id', deleteProduct)   // Delete Product

module.exports = router;


/* SAMPLE DATA


{
"name":"Milk",
"unitPrice":"40",
"uom":"Nos",
"sellingPrice":"45"
}

*/