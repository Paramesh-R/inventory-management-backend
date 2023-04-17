const Customer = require('../models/customerModel');
const uuid = require('uuid');


// List all Customer
const listCustomer = async (req, res) => {
    try {
        const result = await Customer.find({})
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Read Customer 
const readCustomer = async (req, res) => {
    try {
        const result = await Customer.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Customer not found" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Add Customer
const addCustomer = async (req, res) => {
    console.log(req.body)
    const { name, email, phone } = req.body;
    const id = "Customer-" + uuid.v4()
    try {
        const newCustomer = await Customer.create({ id, name, email, phone })
        console.log("**created new customer**" + newCustomer)
        res.status(200).send({
            "message": "Customer added Successfully",
            "id": newCustomer.id
        })
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).send({ "message": "Customer already exist" })
            console.log(error.code, error)
        } else {
            res.status(500).send({ "message": "Unknown Error: " + error.code })
        }
    }





}
// Edit Customer
const editCustomer = async (req, res) => {
    const id = req.params.id;

    const { name, email, phone } = req.body;
    console.log(name, email, phone)
    try {

        const result = await Customer.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Customer not found" });
        } else {
            const updatedCustomer = await Customer.updateOne(
                { "id": id },
                { name, email, phone }
            )

            res.status(200).send({
                "message": "Customer details updated Successfully",
                "id": updatedCustomer.id
            })
        }



    } catch (error) {
        if (error.code === 11000) {
            res.status(500).send({ "message": email + " already used by another Customer. " })
        } else {
            res.status(500).send({ "message": "Unknown Error: " + error.code })
        }
    }
}
// Delete Customer
const deleteCustomer = async (req, res) => {
    const id = req.params.id;


    try {

        const result = await Customer.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Customer not found" });
        } else {
            const deletedCustomer = await Customer.deleteOne({ "id": id })

            res.status(200).send({
                "message": "Customer deleted Successfully",
                "id": deletedCustomer.id
            })
        }



    } catch (error) {
        res.status(500).send({ "message": "Unknown Error: " + error.code })
    }
}

module.exports = {
    listCustomer,
    readCustomer,
    addCustomer,
    editCustomer,
    deleteCustomer
}
