import mongoose, { Schema, model, models } from "mongoose";

const orderItemSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
});

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "processing",
    },
    shippingAddress: {
        name: String,
        email: String,
        address: String,
        city: String,
        zip: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        default: "card",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
