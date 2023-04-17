const { default: mongoose } = require("mongoose");



const buyerSchema = mongoose.Schema({
    id: {
        type: "String",
        // default: "buyer-" + uuid.v4()
    },
    name: {
        type: "String",
        required: [true, "buyer should not be empty"],
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



const Buyer = mongoose.model("Buyers", buyerSchema);
module.exports = Buyer;