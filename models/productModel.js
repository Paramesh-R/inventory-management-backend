const { default: mongoose } = require("mongoose");



const productSchema = mongoose.Schema({
    id: {
        type: "String",
        // default: "product-" + uuid.v4()
    },
    name: {
        type: "String",
        required: [true, "product should not be empty"],
        unique: true,
        trim: true,
        min: 4,
    },
    unitPrice:      { type: "String" },
    uom:            { type: "String", default: "Nos" },
    sellingPrice:   { type: "String" },
    currentStock:   { type: "Number", default: 0 },
    minStock:       { type: "Number", default: 3 },
    maxStock:       { type: "Number", default: 20 },

}, { timestamps: true })



const Product = mongoose.model("products", productSchema);
module.exports = Product;
