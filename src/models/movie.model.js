import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    image_url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    producer: {
        type: String,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
});

const Movie = model("Movie", movieSchema);

export default Movie;
