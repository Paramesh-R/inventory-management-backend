const Buyer = require('../models/buyerModel');
const uuid = require('uuid');


// List all buyer
const listBuyer = async (req, res) => {
    try {
        const result = await Buyer.find({})
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Read buyer 
const readBuyer = async (req, res) => {
    try {
        const result = await Buyer.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Buyer not found" });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ 'message': "Unknown Error:" + error.code });
    }
}
// Add Buyer
const addBuyer = async (req, res) => {
    const { name, email, phone } = req.body;
    const id = "buyer-" + uuid.v4()
    try {
        const buyer = await Buyer.create({ id, name, email, phone })
        res.status(200).send({
            "message": "Buyer added Successfully",
            "id": buyer.id
        })
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).send({ "message": "Buyer already exist" })
        } else {
            res.status(500).send({ "message": "Unknown Error: " + error.code })
        }
    }





}
// Edit Buyer
const editBuyer = async (req, res) => {
    const id = req.params.id;

    const { name, email, phone } = req.body;
    try {

        const result = await Buyer.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Buyer not found" });
        } else {
            const buyer = await Buyer.updateOne(
                { "id": id },
                { name, email, phone }
            )

            res.status(200).send({
                "message": "Buyer details updated Successfully",
                "id": buyer.id
            })
        }



    } catch (error) {
        if (error.code === 11000) {
            res.status(500).send({ "message": email + " already used by another buyer. " })
        } else {
            res.status(500).send({ "message": "Unknown Error: " + error.code })
        }
    }
}
// Delete Buyer
const deleteBuyer = async (req, res) => {
    const id = req.params.id;


    try {

        const result = await Buyer.findOne({ "id": req.params.id })
        if (!result) {
            res.status(500).send({ 'message': "Buyer not found" });
        } else {
            const buyer = await Buyer.deleteOne({ "id": id })

            res.status(200).send({
                "message": "Buyer deleted Successfully",
                "id": buyer.id
            })
        }



    } catch (error) {
        res.status(500).send({ "message": "Unknown Error: " + error.code })
    }
}

module.exports = {
    listBuyer,
    readBuyer,
    addBuyer,
    editBuyer,
    deleteBuyer
}
