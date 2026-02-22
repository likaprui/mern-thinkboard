import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("good")
    }catch(error){
        console.error("Err", error)
    }
}

// mongodb+srv://thinkboard_user:overthinker@cluster0.ykmnze3.mongodb.net/?appName=Cluster0