const { mongoose } = require(`mongoose`);

const purchaseOrderSchema = mongoose.Schema({
    id: { type: 'String' },
    poNumber: { type: 'Number' },
    buyer: {
        id: { type: "String" },
        name: { type: 'String' }
    },
    items: {},
    purchasePrice: { type: 'String' }

})


const purchaseOrder = mongoose.model("purchaseOrders", purchaseOrderSchema)

module.exports = purchaseOrder