import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        }),
    );
}
app.use(express.json()); // this middleware will parse the body of the request: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method: ${req.method} & Req URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
});
