import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db.js";
import userRoute from "./routes/user.route.js";
import morgan from "morgan";

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
