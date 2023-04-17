const { default: mongoose } = require("mongoose");



const customerSchema = mongoose.Schema({
    id: {
        type: "String",
        // default: "Customer-" + uuid.v4()
    },
    name: {
        type: "String",
        required: [true, "Customer should not be empty"],
        min: 4
    },
    email: {
        type: "String",
        required: [true, "email id should not be empty"],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"]
    },
    phone: {
        type: String,
        default: "+91"
    },


}, { timestamps: true })



const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;