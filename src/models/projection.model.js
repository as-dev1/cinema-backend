import { Schema, model } from "mongoose";

const projectionSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    starting_at: {
        type: Date,
        required: true,
    },
});

const Projection = model("Projection", projectionSchema);
export default Projection;
