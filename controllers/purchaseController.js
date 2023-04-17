const purchaseOrder = require('../models/purchaseOrderModel');
const Product = require('../models/productModel');
const uuid = require('uuid');

// List all Purchase Orders
const listPurchase = async (req, res) => {
    try {
        const result = await purchaseOrder.find({});
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Read Purchase Order
const readPurchase = async (req, res) => {
    try {
        const result = await purchaseOrder.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Purchase Order not found" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}

// Create New Purchase Order
const addPurchase = async (req, res) => {
    const id = "PurchaseID-" + uuid.v4();
    const poNumber = await purchaseOrder.countDocuments({}) + 1;// 1 + Total count of documents in collection
    const { items, purchasePrice, buyer } = req.body;

    console.log(items)
    console.log(typeof items)
    try {
        // Insert Purchase Order
        const newPO = await purchaseOrder.create({
            id,
            poNumber,
            buyer,
            items: items.cart,
            purchasePrice,
        })
        // Update Stock value
        items.cart && items.cart.forEach(async (element) => {
            // Find current_stock and add element quantity from PO
            const product_found = await Product.findOne({ "id": element.id })
            const currentStock = Number(product_found.currentStock) + Number(element.quantity);

            // Update new stock quantity to products
            const updatedProduct = await Product.updateOne(
                { "id": element.id },
                { currentStock }
            )

            console.log("Product Quantity updated successfully")
        });

        res.status(200).send({
            'message': 'Purchase Order created successfully',
            'id': newPO
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Unknown Error: " + error })

    }

}

module.exports = {
    listPurchase,
    readPurchase,
    addPurchase,
}