import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/api/notes", notesRouter);

app.get("/api/notes", (req, res) => {
    res.send("you got 5 notes3123");
});

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server running on port 5001");
    });
});
