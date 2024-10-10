import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB } from "./db.js";
import userRoute from "./routes/user.route.js";
import movieRoute from "./routes/movie.route.js";
import projectionRoute from "./routes/projection.route.js";
import reviewRoute from "./routes/review.route.js";
import cartRoute from "./routes/cart.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", userRoute);
app.use("/api/movie", movieRoute);
app.use("/api/projection", projectionRoute);
app.use("/api/review", reviewRoute);
app.use("/api/cart", cartRoute);

const runServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runServer();
