import express from "express"
// const express = require("express")
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"


// dotenv.config();
connectDB();

const app = express()
const PORT = process.env.PORT || 5001




// middlewere
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json())   // this middleware parses JSON bodies: req.body
app.use(rateLimiter)

// our simple custom middleware
// app.use((req,res,next) => { 
//     console.log(`we juste is ${req.method} & req Url is ${req.url} gote`)
//     next()
// })


app.use("/api/notes", notesRoutes)


app.listen(5001, ()=>{
console.log("Server started on PORT: 5001", PORT)})


// mongodb+srv://pruidzelika7_db_user:sVOJPgM5Ud6a9msN@cluster0.5z0bx26.mongodb.net/?appName=Cluster0