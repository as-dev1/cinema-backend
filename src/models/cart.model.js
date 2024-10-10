import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    projection: {
        type: Schema.Types.ObjectId,
        ref: "Projection",
        required: true,
    },
    status: {
        type: String,
        enum: ["reserved", "watched", "cancelled"],
        default: "reserved",
    },
});

const Cart = model("Cart", cartSchema);
export default Cart;
