import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // this middleware will parse the body of the request: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method: ${req.method} & Req URL: ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    });
});
