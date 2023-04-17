const { mongoose } = require(`mongoose`);

const salesOrderSchema = mongoose.Schema({
    id: { type: 'String' },
    invoiceNumber: { type: 'Number' },
    customer: {
        id: { type: "String" },
        name: { type: 'String' }
    },
    /* products: [{
        id: { type: "String" },
        name: { type: 'String' },
        sellingPrice: { type: 'String' },
        quantity: { type: 'Number' },
        uom: { type: 'String' },
        total: { type: 'String' }
    }], */
    items: {},
    salesPrice: { type: 'String' }

})


const salesOrder = mongoose.model("salesOrders", salesOrderSchema)

module.exports = salesOrder