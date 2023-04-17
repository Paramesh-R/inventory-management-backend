var express = require('express');
const { listPurchase,
    readPurchase,
    addPurchase,
} = require('../controllers/purchaseController');
var router = express.Router();


router.get('/', listPurchase)          //show all Purchase
router.get('/:id', readPurchase)       //show  Purchase with id
router.post('/', addPurchase)          // Add Purchase

module.exports = router;


/* SAMPLE DATA


{{
    "buyer": {
        "id": "buyer-8d917574-e7af-4f83-9195-1fa144555ed7",
        "name": "TEST2"
    },
    "products": [
        {
            "id": "product-9aa83e1d-cc20-4c24-9284-9ef74b2ad31a",
            "name": "Milk",
            "unitPrice": "40",
            "quantity": 2,
            "uom": "Nos",
            "total": "80"
        },
        {
            "id": "product-11a5c6bc-5821-48a9-abc4-395642137ab0",
            "name": "Sugar 1kg",
            "unitPrice": "40",
            "quantity": 2,
            "uom": "Nos",
            "total": "80"
        }
    ],
    "purchasePrice": "160"
}

*/