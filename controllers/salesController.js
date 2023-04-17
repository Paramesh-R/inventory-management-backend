const SalesOrder = require('../models/salesOrderModel');
const Product = require('../models/productModel');
const uuid = require('uuid');

// List all Sales Orders
const listSales = async (req, res) => {
    try {
        const result = await SalesOrder.find({});
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Read Sales Order
const readSales = async (req, res) => {
    try {
        const result = await SalesOrder.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Sales Order not found" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}

// Create New Sales Order
const addSales = async (req, res) => {
    const id = "Sales-" + uuid.v4();
    const invoiceNumber = await SalesOrder.countDocuments({}) + 1;// 1 + Total count of documents in collection
    const { customer, items, salesPrice, } = req.body;


    try {
        // Insert Sales Order
        const newInvoice = await SalesOrder.create({
            id,
            invoiceNumber,
            customer,
            items: items.cart,
            salesPrice,
        })
        // Update Stock value
        items.cart && items.cart.forEach(async (element) => {
            // Find current_stock and add element quantity from PO
            const product_found = await Product.findOne({ "id": element.id })
            const currentStock = Number(product_found.currentStock) - Number(element.quantity);

            // Update new stock quantity to items
            const updatedProduct = await Product.updateOne(
                { "id": element.id },
                { currentStock }
            )

            console.log("Product Quantity updated successfully")
        });

        res.status(200).send({
            'message': 'Sales Order created successfully',
            'id': newInvoice
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ "message": "Unknown Error: " + error })

    }

}

module.exports = {
    listSales,
    readSales,
    addSales,
}