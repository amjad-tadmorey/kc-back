const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        created_at: {
            type: String,
            default: new Date(Date.now()).toLocaleString()
        },
        customer_name: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        phone_number: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        phone_number_2: {
            type: String
        },
        address: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        area: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        show_room: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        sales_man: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        branch: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        order_type: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        delivery_type: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        delivery_date: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        technical: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        status: {
            type: String,
            default: "قيد الإنتظار"
        },
        is_vip: {
            type: Boolean,
            default: false
        },

        products: [
            {
                product: String,
                quantity: Number,
            }
        ],
        rooms: {
            type: [mongoose.Schema.Types.Mixed], // Accepts array of any shape
        },
        cuttoff_materials: [
            {
                product: String,
                quantity: Number

            }

        ]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
