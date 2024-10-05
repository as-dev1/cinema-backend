import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    favouriteGenres: {
        type: [String],
        default: [],
    },
});

const User = model("User", userSchema);

export default User;