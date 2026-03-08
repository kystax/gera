import mongoose, { Schema, model, models } from "mongoose";

const cartItemSchema = new Schema({
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

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;
