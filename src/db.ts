import mongoose from "mongoose";
import {config} from "dotenv";
config();
const MONGO_URL:string = process.env.MONGO_URL as string;

export const connectDB =async()=>{
    await mongoose.connect(MONGO_URL,{
        
    }).then(()=>{
        console.log('database connected successfully');
    }).catch((error)=>{
        console.error("Error connecting to database");
    })
};