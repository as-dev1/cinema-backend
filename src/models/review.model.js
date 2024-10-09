import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
    {
        movie: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Review = model("Review", reviewSchema);
export default Review;
