var express = require('express');
const { listBuyer,
    readBuyer,
    addBuyer,
    editBuyer,
    deleteBuyer } = require('../controllers/buyerController');
var router = express.Router();


router.get('/', listBuyer)          //show all buyer
router.get('/:id', readBuyer)       //show  buyer with id
router.post('/', addBuyer)          // Add buyer
router.put('/:id', editBuyer)        // Edit Buyer
router.delete('/:id', deleteBuyer)   // Delete buyer

module.exports = router;




/* SAMPLE DATA
{ 
"name": "TEST2", 
"email": "test13@gmail.com", 
"phone": "999998888" 
}
 */