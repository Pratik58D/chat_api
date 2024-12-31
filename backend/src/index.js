import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./lib/socket.io.js"

//for deplyoment
import path, { dirname } from "path";

dotenv.config();
const Port = process.env.PORT || 5001;
const __dirname = path.resolve();

connectDB();
app.use(express.json({
    limit :"50mb",
}));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//for prodution
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname , "../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

server.listen(Port, () => console.log(`server is running ${Port} `));
