import express from "express"
// const express = require("express")
import cors from "cors"
// import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"


// dotenv.config();


const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()



// middlewere
if(process.env.NODE_ENV !== "production")
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

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    })
})


// mongodb+srv://pruidzelika7_db_user:sVOJPgM5Ud6a9msN@cluster0.5z0bx26.mongodb.net/?appName=Cluster0