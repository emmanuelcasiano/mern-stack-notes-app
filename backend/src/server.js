import express from "express";
import notesRouter from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesRouter);

app.get("/api/notes", (req, res) => {
    res.send("you got 5 notes3123");
});

app.listen(5001, () => {
    console.log("Server running on port 5001");
});

// mongodb+srv://casianoemmanuel2217_db_user:jGbdDanXI36jlSv6@cluster0.sg6mpup.mongodb.net/?appName=Cluster0
