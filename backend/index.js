// Packeges

import path from "path";
import express from "express";
//import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//utilities
import connectDB from "./config/db.js";
dotenv.config();


const Port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hellow World");
});

app.listen(Port, () => console.log(`Server running on port: ${Port}`));
