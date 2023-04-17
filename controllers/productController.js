const Product = require('../models/productModel');
const uuid = require('uuid');


// List all Product
const listProduct = async (req, res) => {
    try {
        const result = await Product.find({})
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Read Product 
const readProduct = async (req, res) => {
    try {
        const result = await Product.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Product not found" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Add Product
const addProduct = async (req, res) => {
    const id = "product-" + uuid.v4();
    const { name, unitPrice, uom, sellingPrice, minStock, maxStock } = req.body;
    try {
        const new_product = await Product.create({ id, name, unitPrice, uom, sellingPrice, minStock, maxStock })
        res.status(200).send({
            "message": "Product added Successfully",
            "id": new_product
        })
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {
            res.status(500).send({ "message": "Product already exist" })
        } else {
            res.status(500).send({ "message": "Unknown Error: " + error })
        }
    }





}
// Edit Product
const editProduct = async (req, res) => {
    const id = req.params.id;

    const { name, unitPrice, uom, sellingPrice, minStock, maxStock } = req.body;
    try {

        const result = await Product.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Product not found" });
        } else {
            const updatedProduct = await Product.updateOne(
                { "id": id },
                { name, unitPrice, uom, sellingPrice, minStock, maxStock }
            )

            res.status(200).send({
                "message": "Product details updated Successfully",
                "id": updatedProduct.id
            })
        }



    } catch (error) {

        if (error.code === 11000) {
            res.status(500).send({ "message": name + " already exist. " })
        } else {
            res.status(500).send({ "message": "Unknown Error: " + error.code })
        }
    }
}
// Delete Product
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    console.log("Inside Delete" + id)

    try {

        const result = await Product.findOne({ "id": id })
        console.log('result' + result);
        if (!result) {
            console.log(`product not found`);
            res.status(500).send({ 'message': "Product not found" });

        } else {
            console.log(`product found ` + id);
            const deleted = await Product.deleteOne({ "id": id })
            console.log('deleted');
            res.status(200).send({
                "message": "Product deleted Successfully",
                "id": deleted.id
            })
        }



    } catch (error) {
        console.log("Delete Error:" + error)
        res.status(500).send({ "message": "Unknown Error: " + error.code })
    }
}

module.exports = {
    listProduct,
    readProduct,
    addProduct,
    editProduct,
    deleteProduct
}

