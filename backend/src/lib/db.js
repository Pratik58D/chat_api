import mongoose from "mongoose";

export const connectDB =async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connection to database sucessfull ${conn.connection.host}`);
        
    } catch (error) {
        console.log("database connection failed", error)
        
    }
}

