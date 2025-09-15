// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";




dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

//middleware
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on Port:", PORT);
    });
});